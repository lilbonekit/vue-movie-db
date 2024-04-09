<template>
  <div class="dot">
    <div class="dot__dot" />
    <div class="dot__dot" />
    <div class="dot__dot" />
  </div>
</template>

<style lang="scss" scoped>
.dot {
  text-align: center;
}

.dot__dot {
  animation: dot-keyframes 1.5s infinite ease-in-out;
  background-color: var(--primary-main);
  border-radius: toRem(10);
  display: inline-block;
  height: toRem(10);
  width: toRem(10);
  margin-right: toRem(5);

  &:nth-child(2) {
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    animation-delay: 1s;
    margin-right: 0;
  }
}

@keyframes dot-keyframes {
  0% {
    opacity: 0.4;
    transform: scale(1, 1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }

  100% {
    opacity: 0.4;
    transform: scale(1, 1);
  }
}
</style>
