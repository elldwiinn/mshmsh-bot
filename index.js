const mineflayer = require('mineflayer')

const botOptions = {
    host: 'highways.aternos.me', // جرب الـ DynIP هنا إذا استمر الخطأ
    username: 'mshmsh',
    version: '1.21.1',
    checkTimeoutInterval: 60000, // زيادة وقت انتظار الاستجابة لـ 60 ثانية
    auth: 'offline' // التأكيد على الدخول بدون حساب رسمي
};

function startBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('login', () => {
        console.log('✅ مشمش: تم تسجيل الدخول!');
    });

    bot.on('spawn', () => {
        console.log('🚀 مشمش: أنا الآن داخل السيرفر!');
        bot.chat('مشمش وصل يا شباب!');
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNRESET') {
            console.log('⚠️ السيرفر رفض الاتصال (ECONNRESET). جاري إعادة المحاولة بعد 10 ثوانٍ...');
        } else {
            console.log('❌ خطأ آخر:', err.message);
        }
        setTimeout(startBot, 10000); // إعادة محاولة ذكية
    });

    bot.on('end', () => {
        console.log('📉 انقطع الاتصال، سأحاول العودة قريباً...');
        setTimeout(startBot, 10000);
    });
}

startBot();
