// 切换模块函数
function switchModule(module) {
    // 隐藏所有模块
    const modules = document.querySelectorAll('.module');
    modules.forEach(mod => mod.classList.remove('active'));

    // 显示选中的模块
    document.getElementById(module).classList.add('active');
}
//药材价格表
const herbPricesData = {
    //生息药材
    "shengxi": {
        "火精枣": 2000000,
        "地黄参": 2000000,
        "宁心草": 2000000,
        "凝血草": 2000000,
        "红绫草": 2000000,
        "恒心草": 2000000,
        "罗犀草": 2000000,
        "天青花": 2000000,
        "银月花": 2000000,
        "宁神花": 2000000,
        "剑芦": 2000000,
        "七星草": 2000000,
        "五柳根": 2400000,
        "天元果": 2400000,
        "流莹草": 2400000,
        "蛇涎果": 2400000,
        "风灵花": 2400000,
        "伏龙参": 2400000,
        "何首乌": 2400000,
        "夜交藤": 2400000,
        "夏枯草": 2400000,
        "百草露": 2400000,
        "凌风花": 2400000,
        "补天芝": 2400000,
        "紫猴花": 3800000,
        "九叶芝": 3800000,
        "幻心草": 3800000,
        "鬼臼草": 3800000,
        "血莲精": 4600000,
        "鸡冠草": 4600000,
        "银精芝": 4600000,
        "玉髓芝": 4600000,
        "地心火芝": 5400000,
        "天蝉灵叶": 5400000,
        "雪玉骨参": 5400000,
        "腐骨灵花": 5400000,
        "三叶青芝": 6400000,
        "七彩月兰": 6400000,
        "三尾风叶": 6400000,
        "冰灵焰草": 6400000,
        "地心淬灵乳": 7200000,
        "天麻翡石精": 7200000,
        "八角玄冰草": 7200000,
        "奇茸通天菊": 7200000,
        "檀芒九叶花": 8000000,
        "坎水玄冰果": 8000000,
        "剑魄竹笋": 8800000,
        "明心问道果": 8800000
    },
    //非生息药材
    "nonShengxi": {
        "轻灵草": 1500000,
        "龙葵": 1500000,
        "弗兰草": 1500000,
        "玄参": 1500000,
        "枫香脂": 1500000,
        "炼魂珠": 1500000,
        "玄冰花": 1500000,
        "炼血珠": 1500000,
        "菩提花": 1900000,
        "乌稠木": 1900000,
        "雪凝花": 1900000,
        "龙纹草": 1900000,
        "石龙芮": 1900000,
        "锦地罗": 1900000,
        "冰灵果": 1900000,
        "玉龙参": 1900000,
        "天灵果": 2300000,
        "灯心草": 2300000,
        "穿心莲": 2300000,
        "龙鳞果": 2300000,
        "伴妖草": 2300000,
        "剑心竹": 2300000,
        "绝魂草": 2300000,
        "月灵花": 2300000,
        "白沉脂": 2800000,
        "苦曼藤": 2800000,
        "血菩提": 2800000,
        "诱妖草": 2800000,
        "混元果": 2800000,
        "皇龙花": 2800000,
        "天剑笋": 2800000,
        "黑天麻": 2800000,
        "天问花": 3200000,
        "渊血冥花": 3200000,
        "芒焰果": 3200000,
        "问道花": 3200000,
        "血玉竹": 3200000,
        "肠蚀草": 3200000,
        "凤血果": 3200000,
        "冰精芝": 3200000,
        "阴阳黄泉花": 3600000,
        "厉魂血珀": 3600000,
        "浩淼水藤": 3600000,
        "道蕴花": 3600000,
        "狼桃": 3600000,
        "霸王花": 3600000,
        "太清玄灵草": 3600000,
        "冥胎骨": 3600000,
        "太乙碧莹花": 4000000,
        "森檀木": 4000000,
        "炼心芝": 4000000,
        "重元换血草": 4000000,
        "地龙干": 4000000,
        "龙须藤": 4000000,
        "鬼面花": 4000000,
        "梧桐木": 4000000
    },
    //特殊药材
    "specialHerbs": {
        "木灵三针花": 10000000,
        "鎏鑫天晶草": 10000000,
        "离火梧桐芝": 12000000,
        "尘磊岩麟果": 12000000
    }
};

// 提取药材信息
function extractInfo(text) {
    //提取药材价格
    function extractHerbPrices(text) {
        const herbPrices = [];
        const namePattern = /名字：([^\n]+?)(?=\s+品级：|$)/g;
        const quantityPattern = /拥有数量：(\d+)/g;

        let nameMatch;
        let quantityMatch;

        // 遍历提取药材信息
        while ((nameMatch = namePattern.exec(text)) !== null && (quantityMatch = quantityPattern.exec(text)) !== null) {
            const herbName = nameMatch[1];
            const quantity = parseInt(quantityMatch[1]);

            // 查找药材价格
            let price = 0;
            let found = false;

            // 首先检查特殊药材
            if (herbPricesData.specialHerbs[herbName]) {
                price = herbPricesData.specialHerbs[herbName];
                found = true;
            }

            // 如果没有找到，再检查生息药材
            if (!found && herbPricesData.shengxi[herbName]) {
                price = herbPricesData.shengxi[herbName];
                found = true;
            }

            // 如果没有找到，再检查非生息药材
            if (!found && herbPricesData.nonShengxi[herbName]) {
                price = herbPricesData.nonShengxi[herbName];
                found = true;
            }

            // 如果找到了价格，创建 HerbPrice 对象并加入到列表
            if (found) {
                herbPrices.push(new HerbPrice(herbName, price, quantity));
            } else {
                // 如果找不到价格，标记为0
                herbPrices.push(new HerbPrice(herbName, 0, quantity));
            }
        }

        herbPrices.sort((a, b) => b.price - a.price);
        let result = '';
        for (const herbPrice of herbPrices) {
            const priceText = `坊市上架 ${herbPrice.name} ${herbPrice.price} ${herbPrice.quantity}`;
            result += `
                <div class="item">
                    <span>${priceText}</span>
                    <button class="copy-button" data-text="${priceText}">复制</button>
                </div>
                `;
        }
        return result;
    }

    //炼金
    function extractAlchemyContent(text) {
        const elixirs = extractElixirs(text);
        const skillsAndTechniques = extractSkillsAndTechniques(text);

        let output = '<h2></h2>';

        output += '<div>炼金丹药：</div>';
        output += '<ul>';
        for (const elixir of elixirs) {
            output += `<div class="item">炼金${elixir.name} ${elixir.quantity}<button class="copy-button" data-text="炼金${elixir.name} ${elixir.quantity}">复制</button></div>`;
        }
        output += '</ul>';

        const skillTypes = {神通: [], 功法: []};
        for (const item of skillsAndTechniques) {
            skillTypes[item.type].push(item);
        }

        output += '<div>炼金神通/功法：</div>';
        output += '<ul>';
        for (const skill of skillTypes['神通']) {
            output += `<div class="item">炼金${skill.name} ${skill.quantity}<button class="copy-button" data-text="炼金${skill.name} ${skill.quantity}">复制</button></div>`;
        }
        output += '</ul>';

        output += '<ul>';
        for (const technique of skillTypes['功法']) {
            output += `<div class="item">炼金${technique.name} ${technique.quantity}<button class="copy-button" data-text="炼金${technique.name} ${technique.quantity}">复制</button></div>`;
        }
        output += '</ul>';

        return output;
    }

    //炼金丹药
    function extractElixirs(text) {
        const elixirRegex = /名字：((?!蛋|渡厄丹|筑基丹|化劫丹|太上玄门丹|金仙破厄丹|太乙炼髓丹|极品遁一丹|极品至尊丹|九天蕴仙丹|真仙造化丹|大道归一丹|菩提证道丹|太清玉液丹|陨铁炉|雕花紫铜炉|寒铁铸心炉)[^\n]+?)\s*效果：[^\n]*?\s*拥有数量：(\d+)(?!.*炉)/g;

        const elixirs = [];
        let match;
        while ((match = elixirRegex.exec(text)) !== null) {
            const name = match[1];
            const quantity = parseInt(match[2]);
            elixirs.push({name, quantity});
        }

        return elixirs;
    }

    //炼金神通功法
    function extractSkillsAndTechniques(text) {
        const skillRegex = /(天阶|地阶|玄阶|黄阶|人阶)(下品|上品)?(神通|功法)(?:-| )?([^\n]+?):[^\n]*?\s*拥有数量:(\d+)/g;

        const skillsAndTechniques = [];
        let match;
        while ((match = skillRegex.exec(text)) !== null) {
            const type = match[3];
            const name = match[4].trim();
            const quantity = parseInt(match[5]);
            skillsAndTechniques.push({type, name, quantity});
        }

        return skillsAndTechniques;
    }

    class HerbPrice {
        constructor(name, price, quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }

    const herbResults = extractHerbPrices(text);
    const alchemyResults = extractAlchemyContent(text);

    document.getElementById('herb-info').innerHTML = herbResults;
    document.getElementById('alchemy-info').innerHTML = alchemyResults;

    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-text');
            copyToClipboard(textToCopy);
            showNotification('复制成功');
        });
    });
}

// 计算药材背包总价值
function calculateTotalValue() {
    const inputText = document.getElementById('herbValueInput').value;
    const regex = /([\u4e00-\u9fa5]{2,5})\s+\S+\s+数量:\s*(\d+)/g;
    let totalValue = 0;

    // 遍历所有匹配的药材名称和数量
    let match;
    while ((match = regex.exec(inputText)) !== null) {
        const herbName = match[1]; // 药材名称
        const quantity = parseInt(match[2]); // 数量

        let foundPrice = 0;

        // 查找该药材的价格
        foundPrice = findHerbPrice(herbName);
        if (foundPrice) {
            totalValue += foundPrice * quantity; // 累加总价值
        }
    }

    // 格式化总价值
    const formattedValue = formatCurrency(totalValue);
    document.getElementById('result').textContent = `药材背包总价值: ${formattedValue}`;
}

// 查找药材价格
function findHerbPrice(herbName) {
    // 遍历所有药材类别，查找对应的价格
    for (let category in herbPricesData) {
        if (herbPricesData[category].hasOwnProperty(herbName)) {
            return herbPricesData[category][herbName];
        }
    }
    // 如果找不到药材价格，返回 0
    return 0;
}

// 格式化数字为“亿”和“万”格式
function formatCurrency(value) {
    if (value >= 100000000) {
        return `${(value / 100000000).toFixed(2)} 亿`;
    } else if (value >= 10000) {
        return `${(value / 10000).toFixed(2)} 万`;
    } else {
        return `${value} 灵石`;
    }
}

// 将内容复制到剪切板
function copyToClipboard(text) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
}

// 提示信息
function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// 粘贴按钮逻辑
document.getElementById('paste-button1').addEventListener('click', () => {
    navigator.clipboard.readText()
        .then(text => {
            document.getElementById('user-input').value = text;
        })
        .catch(err => {
            console.error('Could not read text from clipboard: ', err);
        });
});
document.getElementById('paste-button2').addEventListener('click', () => {
    navigator.clipboard.readText()
        .then(text => {
            document.getElementById('herbValueInput').value = text;
        })
        .catch(err => {
            console.error('无法从剪贴板读取内容：', err);
        });
});
// 提取按钮逻辑
document.getElementById('process-button').addEventListener('click', function () {
    const userInputText = document.getElementById('user-input').value;
    extractInfo(userInputText);
});
// 清空按钮逻辑
document.getElementById('clear-button1').addEventListener('click', function () {
    document.getElementById('user-input').value = '';
    document.getElementById('herb-info').innerHTML = '';
    document.getElementById('alchemy-info').innerHTML = '';
});
document.getElementById('clear-button2').addEventListener('click', function () {
    document.getElementById('herbValueInput').value = '';
    document.getElementById('result').textContent = '总价值: 0 灵石';
});
