<script lang="ts">
import { ref, onErrorCaptured, computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    defaultMessage: {
      type: String,
      default: "Unknown Error Occurred",
    },
    showResetButton: {
      type: Boolean,
      default: true,
    },
    numberOfRetries: {
      type: Number,
      default: 3,
    },
  },
  setup(props) {
    const error = ref<Error | null>(null);
    const resetCount = ref(0);

    const resetDisabled = computed(() => resetCount.value >= props.numberOfRetries);

    const onReset = () => {
      error.value = null;
      resetCount.value += 1;
    };

    onErrorCaptured((thrownError) => {
      error.value = thrownError;
    });

    return {
      error,
      resetCount,
      resetDisabled,
      onReset,
    };
  },
});
</script>

<template>
  <div v-if="error" class="error_boundary">
    <slot v-if="$slots.fallback" name="fallback" />
    <div class="error_boundary_message" v-else>
      <span>
        {{ error.message || defaultMessage }}
      </span>

      <span>
        {{ error.stack }}
      </span>
    </div>

    <template v-if="showResetButton">
      <slot v-if="$slots.resetButton" name="resetButton" :onReset="onReset" />
      <button v-else :disabled="resetDisabled" @click="onReset">Reset</button>
    </template>
  </div>

  <slot v-else></slot>
</template>

<style scoped lang="scss">
$color-error: #760000;
$color-default: #747474;

$semibold: 600;

.error_boundary {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  height: max-content;
  max-height: 500px;
  padding: 10px;
  overflow: scroll;
  white-space: pre;
  background-color: white;

  &:not(:first-child) {
    margin-top: 0;
  }
  & > * {
    margin-top: 10px;
  }

  &_message {
    display: flex;
    flex-direction: column;

    & span:first-of-type {
      color: $color-error;
      font-weight: $semibold;
    }

    & span:last-of-type {
      color: $color-default;
    }
  }
}

button {
  padding: 7px;
  background-color: #7b7b7b;
  font-weight: $semibold;
  color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 2.5px 0.5px rgba(0, 0, 0, 0.5);
  width: 70px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
    box-shadow: none;
  }
}
</style>
