const dataMap = {
  occasion: {
    office: {
      title: "上班通勤",
      formula: ["挺括外套", "纯色内搭", "锥形裤", "干净皮鞋或简洁运动鞋"],
      note: "目标不是用力过猛，而是显得有条理。"
    },
    date: {
      title: "约会",
      formula: ["质感衬衫或针织", "修身长裤", "低噪音鞋款", "一件有线条的外层"],
      note: "重点是干净、成熟、不过分炫技。"
    },
    casual: {
      title: "日常休闲",
      formula: ["高质量基础款", "宽松但有边界的裤型", "轻便鞋款", "一件有存在感的外层"],
      note: "让舒适和利落同时成立。"
    },
    wedding: {
      title: "正式场合",
      formula: ["结构清晰的西装", "衬衫", "皮鞋", "低调配饰"],
      note: "正式场合最怕松垮和鞋不行。"
    },
    travel: {
      title: "旅行出行",
      formula: ["耐脏外套", "透气上装", "有弹性的裤子", "能走路的鞋"],
      note: "移动舒适度优先于堆叠造型。"
    },
    night: {
      title: "晚上聚会",
      formula: ["深色上装", "轮廓清楚的裤子", "利落鞋款", "一件带点锋利感的外套"],
      note: "夜晚穿搭适合把颜色压深、质感拉高。"
    }
  },
  bodyType: {
    slim: {
      fit: "用稍微有厚度和结构感的面料，避免整个人被太薄的衣服拉得更单。",
      avoid: "过紧裤子、过窄肩线、薄贴身 T 恤。"
    },
    average: {
      fit: "你最适合从版型入手，别乱追夸张廓形。",
      avoid: "上下都宽、上下都紧。保持一处放松、一处收束。"
    },
    broad: {
      fit: "肩宽是优势，重点是让上半身别显得拥堵。",
      avoid: "肩部装饰过多、胸前大图案、袖口太紧。"
    },
    stocky: {
      fit: "优先纵向线条和挺括感，裤长和腰线很关键。",
      avoid: "太短上衣、太贴肚子的针织、裤脚堆积。"
    }
  },
  skinTone: {
    fair: ["炭灰", "海军蓝", "鼠尾草绿", "酒红"],
    warm: ["深蓝", "橄榄绿", "奶油白", "焦糖棕"],
    deep: ["象牙白", "钴蓝", "深橄榄", "酒红"]
  },
  styleMood: {
    minimal: {
      voice: "少即是多，版型和配色必须克制。",
      items: ["纯色针织", "直筒裤", "极简德训鞋", "短款外套"]
    },
    smart: {
      voice: "成熟感来自面料、鞋和细节干净度。",
      items: ["针织 Polo", "西裤", "乐福鞋", "轻结构西装外套"]
    },
    street: {
      voice: "街头不是瞎宽大，而是有主次的廓形。",
      items: ["工装夹克", "落肩卫衣", "宽松直筒裤", "厚底板鞋"]
    },
    classic: {
      voice: "别追热度，追稳定耐看。",
      items: ["牛津衬衫", "卡其裤", "绒面德比鞋", "哈灵顿夹克"]
    }
  },
  weather: {
    hot: "优先透气面料，棉麻、轻薄斜纹、针织 Polo 比厚 T 恤更有质感。",
    mild: "最适合做层次，一件轻外套就能把完成度拉起来。",
    cool: "重点放在外套轮廓和鞋子重量感，别只顾上身。",
    cold: "外套是绝对主角，围巾、针织、靴子要统一色调。"
  },
  budget: {
    low: {
      advice: "先买基础四件：深色裤、白色或奶油色上装、轻外套、干净鞋。",
      priority: ["裤子版型", "鞋的干净度", "外套肩线"]
    },
    mid: {
      advice: "在基础款之外加一件质感外套和一双更成熟的鞋，整体层次会明显升级。",
      priority: ["外套面料", "针织品质量", "鞋款成熟度"]
    },
    high: {
      advice: "高预算别乱撒钱，重点投资外套、鞋和剪裁调整。",
      priority: ["面料等级", "修改合身度", "经典单品的长期复用"]
    }
  }
};

const form = document.getElementById("style-form");
const result = document.getElementById("result");
const copyButton = document.getElementById("copy-result");
let lastPlanText = "";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  const occasion = dataMap.occasion[values.occasion];
  const bodyType = dataMap.bodyType[values.bodyType];
  const palette = dataMap.skinTone[values.skinTone];
  const styleMood = dataMap.styleMood[values.styleMood];
  const weather = dataMap.weather[values.weather];
  const budget = dataMap.budget[values.budget];
  const goal = values.goal?.trim() || "先把整体干净度和合身度建立起来。";
  const outfit = buildOutfit(values);
  const shopping = buildShoppingList(values);
  const proportion = buildProportion(values);
  const shoeAdvice = buildShoeAdvice(values);
  const ageAdvice = buildAgeAdvice(values);
  const goalAdvice = buildGoalAdvice(goal, values);

  lastPlanText = [
    `男士穿搭方案：${occasion.title}`,
    `核心公式：${occasion.formula.join(" + ")}`,
    `具体搭配：${outfit.join(" / ")}`,
    `版型建议：${bodyType.fit}`,
    `避坑：${bodyType.avoid}`,
    `配色：${palette.join("、")}`,
    `颜色比例：${proportion}`,
    `鞋履：${shoeAdvice}`,
    `年龄阶段：${ageAdvice}`,
    `预算打法：${budget.advice}`,
    `采购顺序：${shopping.join(" -> ")}`,
    `针对目标：${goalAdvice}`
  ].join("\n");

  result.innerHTML = `
    <article class="result-card featured">
      <p class="result-kicker">一套能直接照穿的方案</p>
      <h3>${occasion.title}：${outfit[0]} + ${outfit[1]}</h3>
      <ul>${outfit.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>

    <article class="result-card">
      <p class="result-kicker">今日主线</p>
      <h3>${occasion.title} 穿搭公式</h3>
      <p>${occasion.note}</p>
      <ul>${occasion.formula.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>

    <article class="result-card">
      <p class="result-kicker">版型建议</p>
      <h3>按体型修正</h3>
      <p>${bodyType.fit}</p>
      <p><strong>避坑：</strong>${bodyType.avoid}</p>
    </article>

    <article class="result-card">
      <p class="result-kicker">配色建议</p>
      <h3>更衬肤色的颜色</h3>
      <p>${weather}</p>
      <p><strong>颜色比例：</strong>${proportion}</p>
      <div class="chips">
        ${palette.map((color) => `<span class="chip">${color}</span>`).join("")}
      </div>
    </article>

    <article class="result-card">
      <p class="result-kicker">风格表达</p>
      <h3>${styleMood.voice}</h3>
      <p>${ageAdvice}</p>
      <ul>${styleMood.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>

    <article class="result-card">
      <p class="result-kicker">预算打法</p>
      <h3>先把钱花在刀刃上</h3>
      <p>${budget.advice}</p>
      <ul>${shopping.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>

    <article class="result-card">
      <p class="result-kicker">鞋裤关系</p>
      <h3>鞋决定完成度</h3>
      <p>${shoeAdvice}</p>
      <p>裤脚要么干净落在鞋面上方，要么轻微触鞋；不要在鞋面堆成一团。</p>
    </article>

    <article class="result-card">
      <p class="result-kicker">针对你的目标</p>
      <h3>个性化提醒</h3>
      <p>${goalAdvice}</p>
    </article>
  `;

  copyButton.disabled = false;
  copyButton.textContent = "复制方案";
});

copyButton.addEventListener("click", async () => {
  if (!lastPlanText) return;
  await navigator.clipboard.writeText(lastPlanText);
  copyButton.textContent = "已复制";
});

function buildOutfit(values) {
  const outfits = {
    minimal: ["奶油白或炭灰上装", "深色直筒裤", "干净低帮鞋", "短款外套或轻薄衬衫外搭"],
    smart: ["针织 Polo 或牛津纺衬衫", "九分西裤", "乐福鞋或德比鞋", "轻结构西装外套"],
    street: ["短款工装夹克", "重磅纯色 T 或卫衣", "宽松直筒裤", "板鞋或厚底运动鞋"],
    classic: ["牛津衬衫", "卡其裤或深色牛仔裤", "绒面鞋", "哈灵顿夹克或海军蓝外套"]
  };
  const base = [...outfits[values.styleMood]];

  if (values.weather === "hot") base[3] = "可省外套，改用有质感的短袖衬衫";
  if (values.weather === "cold") base[3] = "羊毛大衣或厚夹克";
  if (values.occasion === "wedding") return ["深色成套西装", "白衬衫", "黑色或深棕皮鞋", "低调皮带和腕表"];
  if (values.occasion === "travel") return ["耐皱外套", "透气上装", "有弹力直筒裤", "能长时间走路的鞋"];

  return base;
}

function buildShoppingList(values) {
  const basics = {
    low: ["合身深色裤", "干净基础鞋", "纯色上装", "轻外套"],
    mid: ["质感外套", "针织 Polo", "西裤或直筒裤", "乐福鞋/德比鞋"],
    high: ["可修改的外套", "高质量皮鞋", "羊毛或高支棉上装", "长期复用的经典裤型"]
  };
  const list = [...basics[values.budget]];
  if (values.heightGoal === "taller") list.unshift("高腰或中高腰裤");
  if (values.heightGoal === "leaner") list.unshift("深色直线条裤装");
  if (values.shoeMood === "boots") list.push("裤脚能盖住靴筒的直筒裤");
  return list;
}

function buildProportion(values) {
  if (values.heightGoal === "taller") return "70% 主色 + 20% 近似色 + 10% 点缀色；鞋裤尽量同色，拉长腿部。";
  if (values.heightGoal === "leaner") return "80% 深色基础 + 20% 低饱和提亮；避免上下强烈截断。";
  if (values.styleMood === "street") return "60% 基础色 + 30% 军绿/牛仔/棕色 + 10% 配饰点缀。";
  return "70% 基础色 + 20% 辅助色 + 10% 小面积点缀。";
}

function buildShoeAdvice(values) {
  const advice = {
    sneaker: "选低噪音、干净鞋面、鞋型偏窄的运动鞋或板鞋，别选过度科技感的大鞋。",
    loafer: "乐福鞋适合成熟绅雅和约会场景，搭九分裤比搭堆脚裤好很多。",
    derby: "德比鞋/皮鞋适合上班和正式场合，优先黑色或深棕，鞋头不要太尖。",
    boots: "靴子适合偏凉天气和更硬朗的风格，裤腿要能自然覆盖靴口。"
  };
  return advice[values.shoeMood];
}

function buildAgeAdvice(values) {
  const advice = {
    student: "可以保留轻松感，但减少廉价大图案，靠干净度和鞋子提升质感。",
    young: "适合建立个人制服：2 条好裤子、2 双好鞋、2 件稳定外套。",
    mature: "少追潮流，多追面料和剪裁，颜色越稳，质感越重要。"
  };
  return advice[values.ageStage];
}

function buildGoalAdvice(goal, values) {
  const suggestions = [];

  if (goal.includes("显高")) {
    suggestions.push("把上衣下摆缩短、裤腰提高，鞋裤尽量做同色系，视觉上会更利落。");
  }
  if (goal.includes("鞋")) {
    suggestions.push("先建立三双鞋：干净小白鞋、深色乐福或德比、适合天气的休闲鞋。");
  }
  if (goal.includes("成熟")) {
    suggestions.push("少穿大面积卡通印花和软塌面料，改用针织、衬衫、皮鞋或绒面鞋。");
  }
  if (goal.includes("衣柜")) {
    suggestions.push("先淘汰松垮、起球、发黄和不合身的单品，再补核心基础款。");
  }

  if (suggestions.length === 0) {
    suggestions.push("你目前最该优先处理的是合身度、鞋子和配色数量控制，这三项对气质提升最直接。");
  }

  if (values.budget === "low") {
    suggestions.push("低预算阶段别追品牌感，先把裤子、鞋子和一件外套的完成度做出来。");
  }

  if (values.occasion === "date") {
    suggestions.push("约会时宁可简单但质感好，也不要一身堆满设计细节。");
  }

  return suggestions.join("");
}
