// الحصول على عناصر الصفحة
var bookingForm = document.getElementById('bookingForm');
var successMessage = document.getElementById('successMessage');
var errorMessage = document.getElementById('errorMessage');

// عند إرسال النموذج
bookingForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // الحصول على قيم الحقول
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var date = document.getElementById('date').value;
    var service = document.getElementById('service').value;
    var message = document.getElementById('message').value;

    // التحقق من صحة البيانات
    if (name == '' || email == '' || phone == '' || date == '' || service == '') {
        showError('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    // التحقق من صيغة البريد الإلكتروني
    if (!isValidEmail(email)) {
        showError('البريد الإلكتروني غير صحيح');
        return;
    }

    // إخفاء رسالة الخطأ إن وجدت
    errorMessage.style.display = 'none';

    // عرض رسالة النجاح
    var bookingDetails = 'الاسم: ' + name + ' | البريد: ' + email + ' | الموعد: ' + date + ' | الخدمة: ' + service;
    document.getElementById('bookingDetails').textContent = bookingDetails;
    successMessage.style.display = 'block';

    // مسح النموذج
    bookingForm.reset();

    // إخفاء رسالة النجاح بعد 5 ثواني
    setTimeout(function() {
        successMessage.style.display = 'none';
    }, 5000);
});

// دالة للتحقق من صيغة البريد الإلكتروني
function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// دالة لعرض رسالة الخطأ
function showError(errorText) {
    document.getElementById('errorText').textContent = errorText;
    errorMessage.style.display = 'block';

    // إخفاء رسالة الخطأ بعد 4 ثواني
    setTimeout(function() {
        errorMessage.style.display = 'none';
    }, 4000);
}
