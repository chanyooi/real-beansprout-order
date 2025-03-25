// 오늘 날짜 표시
window.onload = function () {
  const today = new Date();
  const formatted = today.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
  });
  document.getElementById("today-date").textContent = `📅 오늘 날짜: ${formatted}`;
};

// Firestore에서 주문 목록 불러오기
const orderBody = document.getElementById("order-body");

db.collection("orders").orderBy("time", "desc").onSnapshot((snapshot) => {
  orderBody.innerHTML = ""; // 기존 테이블 비우기

  snapshot.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.normal}</td>
      <td>${data.cut}</td>
      <td>${data.curly}</td>
      <td>${data.sprout}</td>
      <td>${data.time}</td>
    `;
    orderBody.appendChild(row);
  });
});
