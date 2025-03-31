// 오늘 날짜 표시
window.onload = function () {
  const today = new Date();
  const formatted = today.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
  });
  document.getElementById("today-date").textContent = `📅 오늘 날짜: ${formatted}`;
};

const orderBody = document.getElementById("order-body");

function createRow(data, id) {
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
  return row;
}

function createTotalRow(title, totals) {
  const row = document.createElement("tr");
  row.style.fontWeight = "bold";
  row.style.backgroundColor = "#f1f3f5";
  row.innerHTML = `
    <td>${title}</td>
    <td>${totals.normal}</td>
    <td>${totals.cut}</td>
    <td>${totals.curly}</td>
    <td>${totals.sprout}</td>
    <td colspan="2"></td>
  `;
  return row;
}

db.collection("orders").orderBy("time", "desc").onSnapshot((snapshot) => {
  orderBody.innerHTML = "";

  const grouped = { 구미: [], 김천: [] };
  const totals = {
    구미: { normal: 0, cut: 0, curly: 0, sprout: 0 },
    김천: { normal: 0, cut: 0, curly: 0, sprout: 0 },
    전체: { normal: 0, cut: 0, curly: 0, sprout: 0 }
  };

  snapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    const region = data.region || "기타";

    if (!grouped[region]) grouped[region] = [];
    grouped[region].push({ data, id });

    ["normal", "cut", "curly", "sprout"].forEach(key => {
      totals[region][key] += parseInt(data[key] || 0);
      totals["전체"][key] += parseInt(data[key] || 0);
    });
  });

  ["구미", "김천"].forEach(region => {
    if (grouped[region].length > 0) {
      const header = document.createElement("tr");
      header.innerHTML = `<td colspan="7" style="background:#e0e7ff; font-weight:bold; padding:10px;">📍 ${region} 주문</td>`;
      orderBody.appendChild(header);

      grouped[region].forEach(({ data, id }) => {
        orderBody.appendChild(createRow(data, id));
      });

      orderBody.appendChild(createTotalRow(`${region} 합계`, totals[region]));
    }
  });

  orderBody.appendChild(createTotalRow("전체 합계", totals["전체"]));
});

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
