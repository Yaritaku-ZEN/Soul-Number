// 1.ソウルナンバーごとの簡易データ定義
const SOUL_DATE = {
  1: "リーダー気質・行動力抜群",
  2: "サポート上手・協調性が高い",
  3: "明るいムードメーカー・表現力豊か",
  4: "几帳面・安定感のある努力家",
  5: "好奇心旺盛・変化を好む自由人",
  6: "面倒見が良い・思いやりが深い",
  7: "探究心が強い・独自の視点が深い",
  8: "情熱的・目標達成への意志が強い",
  9: "包容力がある・視野が広い平和主義",
  11: "直感力に優れたメッセンジャー（マスターナンバー）",
  22: "大きな理想を形にするカリスマ（マスターナンバー）",
  33: "枠にとらわれない深い愛情の人（マスターナンバー）",
  44: "社会的な変革を推進する統率者（マスターナンバー）"
};

const MASTER_NUMBERS = [11, 22, 33, 44];

// 2. 生年月日（YYYY-MM-DD）からソウルナンバーを計算する関数
function calculateSoulNumber(dateStr) {
  // ハイフンを除去して1文字ずつの数字配列にする（例： "1995-12-17"  -> [1, 9, 9, 5, 1, 2, 1, 7]）
  const digits = dateStr.replace(/-/g, "").split("").map(Number);

  // 全部の桁を足し算
  let sum = 0;
  for (let num of digits) {
    sum += num;
  }

  // 1桁、またはマスターナンバーになるまで足し算を繰り返す
  while (sum > 9 && !MASTER_NUMBERS.includes(sum)) {
    let nextSum = 0;
    // 数値を文字列にしてから１桁ずつ足す（例：　34 -> "34" -> 3 + 4 = 7）
    for (let char of String(sum)) {
      nextSum = Number(char);
    }
    sum = nextSum;
  }

  return sum;
}

// 3. ボタンがクリックされた時のイベント処理
const calcBtn = document.getElementById("calcBtn");
const birthInput = document.getElementById("birthDate");
const resultArea = document.getElementById("result");
const soulNumberElem = document.getElementById("soulNumber");
const soulDescElem = document.getElementById("soulDescription");

calcBtn.addEventListener("click", () => {
  const dateValue = birthInput.value;
  
  // 日付がからの場合は処理を中断
  if (!dateValue) {
    alert("生年月日を選択して下さい")
    return;
  }

  // 計算実行
  const number = calculateSoulNumber(dateValue);
  const description = SOUL_DATE[number] || "特徴が見つかりませんでした";

  // 画面のテキストを書き換える
  soulNumberElem.textContent = number;
  soulDescElem.textContent = description;

  // 結果枠に表示
  resultArea.classList.remove("hidden");
});