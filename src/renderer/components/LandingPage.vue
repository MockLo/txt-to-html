<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" />
    <header>AUTO H5</header>
    <main>
      <Login />
    </main>
    <footer>&copy;Created by 吴晓航</footer>
  </div>
</template>

<script>
import Login from './LandingPage/Login'

export default {
  name: 'landing-page',
  components: { Login }
}
</script>

<style lang="scss">
#wrapper {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(ellipse at top left, rgba(255, 255, 255, 1) 40%, rgba(229, 229, 229, 0.9) 100%);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#logo {
  width: 80px;
  height: auto;
  margin-bottom: 20px;
  animation: circle 10s linear infinite;
}

header {
  font-size: 15px;
  color: $color-normal;
}

main {
  width: 100%;
  height: 100%;
  margin: 3vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

footer {
  color: $color-grey;
  font-size: 12px;
}

@keyframes circle {
  100% {
    transform: rotate(360deg);
  }
}
</style>
