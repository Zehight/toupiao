<script lang="ts" setup>
const prop = defineProps(['dataImage'])

const card: any = ref(null)
const width = ref(0)
const height = ref(0)
const mouseX = ref()
const mouseY = ref(0)
let mouseLeaveDelay: any = null

const mousePX = computed(() => mouseX.value / width.value)
const mousePY = computed(() => mouseY.value / height.value)

const cardStyle = computed(() => {
  const rX = mousePX.value * 28
  const rY = mousePY.value * -28
  return {
    transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
  }
})

const cardBgTransform = computed(() => {
  const tX = mousePX.value * -40
  const tY = mousePY.value * -40
  return {
    transform: `translateX(${tX}px) translateY(${tY}px)`
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
  <div ref="card"
       class="card-wrap"
       @click="aa=!aa"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave"
       @mousemove="handleMouseMove">
    <div :class="aa?'selected':'normol'"
         :style="cardStyle"
         class="card"
    >
      <div :class="aa?'selectedBG':'normolBG'" :style="[cardBgTransform, cardBgImage]" class="card-bg"></div>
      <div style="position: absolute;top:0;bottom: 0;left:0;right:0;z-index: 5;background-color: black;opacity: 0"/>
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
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5D4037;
  text-align: center;
}

p {
  line-height: 1.5em;
}

h1 + p, p + p {
  margin-top: 10px;
}

.container {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

    .card-info, .card-info p {
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
  flex: 0 0 240px;
  width: 100%;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(black, 0.66) 0 3px 6px 0,
  inset #333 0 0 0 5px,
  inset rgba(white, 0.3) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.selected {
  position: relative;
  flex: 0 0 240px;
  width: 100%;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(white, 0.2) 0 3px 6px 0,
  rgba(white, 1) 0 0 0 5px,
  rgba(black, 0.66) 0 15px 30px 0,
  inset #333 0 0 0 5px,
  inset white 0 0 0 6px;
  transition: 1s $returnEasing;
}


//.card-bg {
//  opacity: 0.5;
//  position: absolute;
//  top: -20px;
//  left: -20px;
//  width: 100%;
//  height: 100%;
//  padding: 20px;
//  background-repeat: no-repeat;
//  background-position: center;
//  background-size: cover;
//  transition: 1s $returnEasing,
//  opacity 5s 1s $returnEasing;
//  pointer-events: none;
//}

.normolBG {
  opacity: 0.5;
  position: absolute;
  top: -20px;
  right: -20px;
  left: -20px;
  bottom: -20px;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 1s $returnEasing,
  opacity 5s 1s $returnEasing;
  pointer-events: none;
}

.selectedBG {
  opacity: 1;
  position: absolute;
  top: -40px;
  right: -40px;
  left: -40px;
  bottom: -40px;
  padding: 40px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 1s $returnEasing,
  opacity 5s 1s $returnEasing;
  pointer-events: none;
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

.card-info h1 {
  font-family: "Playfair Display";
  font-size: 36px;
  font-weight: 700;
  color: #5D4037;
}
</style>