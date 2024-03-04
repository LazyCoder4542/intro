window.addEventListener("DOMContentLoaded", function () {
  console.log("loaded")
  var box = document.querySelector(".con")
  animation(box)
})
const wrapElem = (s) => ".con " + s 
const appendStaggerText = (elem, text) => {
  text.split("").map(c => c === " " ? '&nbsp;' : c).forEach(e => {
    const div = document.createElement("div")
    div.innerHTML = e
    div.className = "letter"
    elem.appendChild(div)
  });
}
function animation(elem) {
  var dots = anime({
    targets: wrapElem(".dots div"),
    translateY: [0, -10, 0],
    loop: true,
    // direction: "alternate",
    endDelay: 0,
    duration: 400,
    easing: 'easeOutInCirc',
    delay: (el, i) => 500 + i * 200 // increase delay by 100ms for each elements.
  });
  var tl = anime.timeline();
  appendStaggerText(elem.querySelector(wrapElem(".text .left .long")), "www.welcometomysite.com")
  appendStaggerText(elem.querySelector(".text .link"), "bit.ly")
  appendStaggerText(elem.querySelector(wrapElem(".text .right")), "/new-user")
  tl.add({
    targets: wrapElem(".text .letter"),
    translateY: [-10, 0],
    opacity: [0, 1],
    duration: 250,
    delay: (el, i) => 500 + i * 50
  })
  var {left: x, top: y, width, height} = elem.querySelector(wrapElem(".text .right")).getBoundingClientRect()
  console.log(x, y, width, height)
  var scissors = elem.querySelector(wrapElem(".scissors2"))
  var video = scissors.querySelector("video")
  // tl.add({
  //   targets: wrapElem(".scissors"),
  //   opacity: 1,
  //   top: [y, y - 60 - 20],
  //   easing: "linear",
  //   begin: function() {
  //     scissors.style.left = x - 10 + "px"
  //     video.play();
  //     anime({
  //       targets: wrapElem(".text .left .long"),
  //       opacity: 0.5,
  //       direction: "forward",
  //       delay: 200,
  //       duration: 500
  //     })
  //   },
  //   complete: () => {
  //     video.pause();
  //     setTimeout(() => {
  //       scissors.style.opacity = 0;
  //     }, 500)
  //   }
  // })
  tl.add({
    targets: wrapElem(".scissors2"),
    opacity: 1,
    top: [y + 60, y - 10],
    easing: "linear",
    begin: function() {
      scissors.style.left = x - 10 + "px"
      video.playbackRate = 0.25
      video.play();
      anime({
        targets: wrapElem(".text .left .long"),
        opacity: 0.3,
        direction: "forward",
        delay: 200,
        duration: 500
      })
    },
    complete: () => {
      video.pause();
      setTimeout(() => {
        scissors.style.opacity = 0;
      }, 1000)
    }
  })
  
  tl.add({
    targets: wrapElem(".text .left"),
    width: 0,
    easing: "linear",
    endDelay: 500,
    complete: () => {
      elem.querySelector(".text .long").style.display = "none";
      elem.querySelector(".text .link").style.position = "relative";
      elem.querySelector(".text .link").style.opacity = 1;
    }
  }, "+=1000")
  tl.add({
    targets: wrapElem(".text .left"),
    width: [0, fn()],
    easing: "linear",
  })
  
  tl.add({
    targets: wrapElem(""),
    opacity: 0,
    complete: () => {
      dots.pause();
    }
  }, "+=1000")
}

function fn() {
  left_width = document.querySelector(".text .link").getBoundingClientRect().width
  return left_width
}