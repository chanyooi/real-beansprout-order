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
    const id = doc.id;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.normal}</td>
      <td>${data.cut}</td>
      <td>${data.curly}</td>
      <td>${data.sprout}</td>
      <td>${data.time}</td>
      <td><button onclick="deleteOrder('${id}')" style="background:#f44336;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">삭제</button></td>
    `;
    orderBody.appendChild(row);
  });
});

// 삭제 함수
type="module"
function deleteOrder(id) {
  if (confirm("정말 이 주문을 삭제하시겠습니까?")) {
    db.collection("orders").doc(id).delete()
      .then(() => {
        alert("주문이 삭제되었습니다.");
      })
      .catch((error) => {
        console.error("삭제 중 오류 발생:", error);
        alert("삭제 중 문제가 발생했습니다.");
      });
  }
}
