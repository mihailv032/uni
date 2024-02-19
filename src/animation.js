//on scroll animation
const observer = new IntersectionObserver( i => {
  i.forEach(item => {
    if(item.isIntersecting){item.target.classList.add("show")}
    else item.target.classList.remove("show")
  })
})

const hiddenElements = document.querySelectorAll(".hidden")
hiddenElements.forEach(element => observer.observe(element))
