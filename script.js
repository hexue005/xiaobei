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
        "火精枣": 5000000,
        "地黄参": 5000000,
        "宁心草": 4800000,
        "凝血草": 4800000,
        "红绫草": 5000000,
        "恒心草": 5000000,
        "罗犀草": 5000000,
        "天青花": 5000000,
        "银月花": 4800000,
        "宁神花": 4800000,
        "剑芦": 5000000,
        "七星草": 5000000,
        "五柳根": 7500000,
        "天元果": 7500000,
        "流莹草": 4800000,
        "蛇涎果": 4800000,
        "风灵花": 7500000,
        "伏龙参": 7500000,
        "何首乌": 7500000,
        "夜交藤": 7500000,
        "夏枯草": 4800000,
        "百草露": 4800000,
        "凌风花": 7500000,
        "补天芝": 7500000,
        "紫猴花": 8400000,
        "九叶芝": 8400000,
        "幻心草": 8400000,
        "鬼臼草": 8400000,
        "血莲精": 9000000,
        "鸡冠草": 9000000,
        "银精芝": 9000000,
        "玉髓芝": 9000000,
        "地心火芝": 10600000,
        "天蝉灵叶": 10600000,
        "雪玉骨参": 10600000,
        "腐骨灵花": 10600000,
        "三叶青芝": 14600000,
        "七彩月兰": 14600000,
        "三尾风叶": 14600000,
        "冰灵焰草": 14600000,
        "地心淬灵乳": 16000000,
        "天麻翡石精": 16000000,
        "八角玄冰草": 16000000,
        "奇茸通天菊": 16000000,
        "檀芒九叶花": 18000000,
        "坎水玄冰果": 18000000,
        "剑魄竹笋": 20000000,
        "明心问道果": 20000000
    },
    //非生息药材
    "nonShengxi": {
        "轻灵草": 4800000,
        "龙葵": 4800000,
        "弗兰草": 4800000,
        "玄参": 4800000,
        "枫香脂": 8400000,
        "炼魂珠": 8400000,
        "玄冰花": 8400000,
        "炼血珠": 8400000,
        "菩提花": 4800000,
        "乌稠木": 4800000,
        "雪凝花": 4800000,
        "龙纹草": 4800000,
        "石龙芮": 9000000,
        "锦地罗": 9000000,
        "冰灵果": 9000000,
        "玉龙参": 9000000,
        "天灵果": 5400000,
        "灯心草": 5400000,
        "穿心莲": 5400000,
        "龙鳞果": 5400000,
        "伴妖草": 10600000,
        "剑心竹": 10600000,
        "绝魂草": 10600000,
        "月灵花": 10600000,
        "白沉脂": 6000000,
        "苦曼藤": 6000000,
        "血菩提": 6000000,
        "诱妖草": 6000000,
        "混元果": 12600000,
        "皇龙花": 12600000,
        "天剑笋": 12600000,
        "黑天麻": 12600000,
        "天问花": 8200000,
        "渊血冥花": 8200000,
        "芒焰果": 8200000,
        "问道花": 8200000,
        "血玉竹": 13000000,
        "肠蚀草": 13000000,
        "凤血果": 13000000,
        "冰精芝": 13000000,
        "阴阳黄泉花": 8600000,
        "厉魂血珀": 8600000,
        "浩淼水藤": 8600000,
        "道蕴花": 8600000,
        "狼桃": 14000000,
        "霸王花": 14000000,
        "太清玄灵草": 14000000,
        "冥胎骨": 14000000,
        "太乙碧莹花": 9000000,
        "森檀木": 9000000,
        "炼心芝": 9000000,
        "重元换血草": 9000000,
        "地龙干": 16000000,
        "龙须藤": 16000000,
        "鬼面花": 16000000,
        "梧桐木": 16000000
    },
    //特殊药材
    "specialHerbs": {
        "木灵三针花": 18000000,
        "鎏鑫天晶草": 18000000,
        "离火梧桐芝": 20000000,
        "尘磊岩麟果": 20000000
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

    class HerbPrice {
        constructor(name, price, quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }

    document.getElementById('herb-info').innerHTML = extractHerbPrices(text);
    //复制按钮逻辑
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
            // 处理粘贴内容，移除所有'-'字符
            document.getElementById('user-input').value = text.replace(/-/g, '');
        })
        .catch(err => {
            console.error('无法从剪贴板读取内容: ', err);
        });
});

document.getElementById('paste-button2').addEventListener('click', () => {
    navigator.clipboard.readText()
        .then(text => {
            // 处理粘贴内容，移除所有'-'字符
            document.getElementById('herbValueInput').value = text.replace(/-/g, '');
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

// 禁止输入'-'字符
document.getElementById('user-input').addEventListener('input', function (event) {
    let userInputText = event.target.value;

    // 检查是否包含 '-' 字符
    if (userInputText.includes('-')) {
        // 如果有'-'字符，去掉它
        event.target.value = userInputText.replace(/-/g, ''); // 替换掉所有的 '-' 字符
    }
});

// 禁止输入'-'字符
document.getElementById('herbValueInput').addEventListener('input', function (event) {
    let userInputText = event.target.value;

    // 检查是否包含 '-' 字符
    if (userInputText.includes('-')) {
        // 如果有'-'字符，去掉它
        event.target.value = userInputText.replace(/-/g, ''); // 替换掉所有的 '-' 字符
    }
});
