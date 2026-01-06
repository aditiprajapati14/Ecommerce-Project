  const quickBtns = document.querySelectorAll(".quick-view");
  const overlay = document.getElementById("qvOverlay");
  const closeBtn = document.getElementById("qvClose");

  const qvImg = document.getElementById("qvImg");
  const qvTitle = document.getElementById("qvTitle");
  const qvOld = document.getElementById("qvOldPrice");
  const qvNew = document.getElementById("qvNewPrice");

  const minus = document.getElementById("minus");
  const plus = document.getElementById("plus");
  const qtyInput = document.getElementById("qtyInput");

  quickBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      const img = card.querySelector("img").src;
      const title = card.querySelector("h3").innerText;
      const price = card.querySelector(".price").innerText;

      qvImg.src = img;
      qvTitle.innerText = title;

      if (price.includes("$")) {
        const prices = price.match(/\$[\d.]+/g);
        qvOld.innerText = prices.length > 1 ? prices[0] : "";
        qvNew.innerText = prices.length > 1 ? prices[1] : prices[0];
      }

      qtyInput.value = 1;
      overlay.style.display = "flex";
    });
  });

  closeBtn.onclick = () => (overlay.style.display = "none");

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.style.display = "none";
  });

  plus.onclick = () => qtyInput.value++;
  minus.onclick = () => {
    if (qtyInput.value > 1) qtyInput.value--;
  };

