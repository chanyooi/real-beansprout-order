// 오늘 날짜 표시
window.onload = function () {
  const today = new Date();
  const formatted = today.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
  });
  document.getElementById("today-date").textContent = `📅 오늘 날짜: ${formatted}`;
};

// 주문 제출 함수
function submitOrder() {
  const name = document.getElementById("name").value;
  const normal = document.getElementById("normal").value;
  const cut = document.getElementById("cut").value;
  const curly = document.getElementById("curly").value;
  const sprout = document.getElementById("sprout").value;
  const time = new Date().toLocaleString('ko-KR');

  if (!name) {
    alert("거래처 이름을 입력해주세요.");
    return;
  }

  const order = { name, normal, cut, curly, sprout, time };

  // Firebase Firestore에 저장
  db.collection("orders").add(order)
    .then(() => {
      document.querySelector(".container").style.display = "none";
      document.getElementById("thank-you").style.display = "block";
    })
    .catch((error) => {
      console.error("오류 발생:", error);
      alert("문제가 발생했습니다. 다시 시도해주세요!");
    });
}

// 다시 작성 버튼
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("normal").value = 0;
  document.getElementById("cut").value = 0;
  document.getElementById("curly").value = 0;
  document.getElementById("sprout").value = 0;
}