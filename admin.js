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
const orderTable = document.getElementById("order-table");

function renderTotals(totals) {
  let totalRow = document.getElementById("total-row");
  if (!totalRow) {
    totalRow = document.createElement("tr");
    totalRow.id = "total-row";
    totalRow.style.fontWeight = "bold";
    totalRow.style.backgroundColor = "#f1f3f5";
    orderBody.appendChild(totalRow);
  }
  totalRow.innerHTML = `
    <td>총합계</td>
    <td>${totals.normal}</td>
    <td>${totals.cut}</td>
    <td>${totals.curly}</td>
    <td>${totals.sprout}</td>
    <td colspan="2"></td>
  `;
}

db.collection("orders").orderBy("time", "desc").onSnapshot((snapshot) => {
  orderBody.innerHTML = ""; // 기존 테이블 비우기

  const totals = { normal: 0, cut: 0, curly: 0, sprout: 0 };

  snapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;

    totals.normal += parseInt(data.normal || 0);
    totals.cut += parseInt(data.cut || 0);
    totals.curly += parseInt(data.curly || 0);
    totals.sprout += parseInt(data.sprout || 0);

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

  renderTotals(totals);
});

// 삭제 함수
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
