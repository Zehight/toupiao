<script lang="ts" setup>
const prop = defineProps(['dataImage', 'dataName'])

const card: any = ref(null)
const width = ref(0)
const height = ref(0)
const mouseX = ref()
const mouseY = ref(0)
let mouseLeaveDelay: any = null

const mousePX = computed(() => mouseX.value / width.value)
const mousePY = computed(() => mouseY.value / height.value)

const cardStyle = computed(() => {
  const rX = mousePX.value * 14
  const rY = mousePY.value * -14
  return {
    transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
  }
})

const cardBgTransform = computed(() => {
  const tX = mousePX.value * -15
  const tY = mousePY.value * -15
  return {
    transform: `scale(1.2) translateX(${tX}px) translateY(${tY}px)`
  }
})

const cardBgImage = computed(() => {
  return {
    backgroundImage: `url(${prop.dataImage})`
  }
})

const handleMouseMove = (e: any) => {
  mouseX.value = Math.abs(e.offsetX) - width.value / 2
  mouseY.value = Math.abs(e.offsetY) - height.value / 2
}

const handleMouseEnter = () => {
  clearTimeout(mouseLeaveDelay)
}

const handleMouseLeave = () => {
  mouseLeaveDelay = setTimeout(() => {
    mouseX.value = 0
    mouseY.value = 0
  }, 1000)
}

onMounted(() => {
  width.value = card.value.offsetWidth
  height.value = card.value.offsetHeight
})

const aa = ref(false)
</script>

<template>
  <div ref="card" class="card-wrap" @click="aa = !aa" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove">
    <div :class="aa ? 'selected' : 'normol'" class="w-100 position-relative elevation-2 rounded-xl card" :style="cardStyle"
      style="padding-top: 133%;">
      <v-img cover :class="aa ? 'selectedBG' : 'normolBG'" class="position-absolute" aspect-ratio="320/240"
        :style="[cardBgTransform]" style="top:0;left: 0;right: 0;bottom: 10%" :src="prop.dataImage">
      </v-img>
      <div class="card-info">
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

body {
  margin: 40px 0;
  font-family: "Raleway";
  font-size: 14px;
  font-weight: 500;
  background-color: #BCAAA4;
  -webkit-font-smoothing: antialiased;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #5D4037;
  text-align: center;
}

p {
  line-height: 1.5em;
}

h1+p,
p+p {
  margin-top: 10px;
}

.card-wrap {
  width: 100%;
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;

  &:hover {
    .card-info {
      transform: translateY(0);
    }

    .card-info p {
      opacity: 1;
    }

    .card-info,
    .card-info p {
      transition: 0.6s $hoverEasing;
    }

    .card-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }

    .card-bg {
      transition: 0.6s $hoverEasing,
    }

    .card {
      transition: 0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
    }
  }
}

.normol {
  position: relative;
  background-color: #333;
  overflow: hidden;
  box-shadow: rgba(black, 0.66) 0 3px 6px 0,
    inset #333 0 0 0 5px,
    inset rgba(white, 0.3) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.selected {
  position: relative;
  overflow: hidden;
  box-shadow: rgba(white, 0.2) 0 3px 6px 0,
    rgba(white, 1) 0 0 0 5px,
    rgba(black, 0.66) 0 15px 30px 0,
    inset #333 0 0 0 5px,
    inset white 0 0 0 6px;
  transition: 1s $returnEasing;
}

.normolBG,.selectedBG {
  width: 100%;
  height: 100%;
  transition: 1s $returnEasing,
  opacity 2s $returnEasing;
  position: absolute;
  pointer-events: none;
  transform-origin: center;
  transform: scale(1.15);
}
.normolBG {
  opacity: 0.5;
}

.selectedBG {
  opacity: 1;
}

.card-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  transform: translateY(50%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s $returnEasing;
  }
}
</style>