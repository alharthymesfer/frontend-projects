// الحصول على العناصر من الصفحة
var taskInput = document.getElementById('taskInput');
var addBtn = document.getElementById('addBtn');
var taskList = document.getElementById('taskList');
var emptyMessage = document.getElementById('emptyMessage');
var clearBtn = document.getElementById('clearBtn');
var filterBtns = document.querySelectorAll('.filter-btn');

// متغير لتخزين الفلتر الحالي
var currentFilter = 'all'; 

// تحميل المهام عند فتح الصفحة
loadTasks();

// إضافة مهمة عند الضغط على زر الإضافة
addBtn.addEventListener('click', function() {
    addTask();
});

// إضافة مهمة عند الضغط على مفتاح Enter
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// الاستماع لأزرار الفلترة
filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // إزالة الفئة active من جميع الأزرار
        filterBtns.forEach(function(b) {
            b.classList.remove('active');
        });
        // إضافة الفئة active للزر المضغوط
        this.classList.add('active');
        // تحديث الفلتر الحالي
        currentFilter = this.getAttribute('data-filter');
        // تحديث عرض المهام
        displayTasks();
    });
});

// حذف جميع المهام
clearBtn.addEventListener('click', function() {
    if (confirm('هل أنت متأكد من حذف جميع المهام؟')) {
        localStorage.removeItem('tasks');
        taskList.innerHTML = '';
        emptyMessage.style.display = 'block';
        updateStats();
    }
});

// دالة لإضافة مهمة جديدة
function addTask() {
    var taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('يرجى إدخال مهمة');
        return;
    }

    // إنشاء كائن المهمة
    var task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // الحصول على المهام من LocalStorage
    var tasks = getTasks();

    // إضافة المهمة الجديدة
    tasks.push(task);

    // حفظ المهام في LocalStorage
    saveTasks(tasks);

    // مسح حقل الإدخال
    taskInput.value = '';
    taskInput.focus();

    // تحديث عرض المهام
    displayTasks();
    updateStats();
}

// دالة لحذف مهمة
function deleteTask(taskId) {
    var tasks = getTasks();
    tasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });
    saveTasks(tasks);
    displayTasks();
    updateStats();
}

// دالة لتعديل حالة المهمة (مكتملة أو لا)
function toggleTask(taskId) {
    var tasks = getTasks();
    tasks.forEach(function(task) {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
    });
    saveTasks(tasks);
    displayTasks();
    updateStats();
}

// دالة للحصول على المهام من LocalStorage
function getTasks() {
    var tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// دالة لحفظ المهام في LocalStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// دالة لعرض المهام
function displayTasks() {
    var tasks = getTasks();
    taskList.innerHTML = '';

    // فلترة المهام حسب الفلتر الحالي
    var filteredTasks = tasks.filter(function(task) {
        if (currentFilter === 'completed') {
            return task.completed;
        } else if (currentFilter === 'pending') {
            return !task.completed;
        }
        return true; // الكل
    });

    // عرض رسالة عدم وجود مهام
    if (filteredTasks.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    // عرض كل مهمة
    filteredTasks.forEach(function(task) {
        var li = document.createElement('li');
        li.className = 'task-item';

        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = '<input type="checkbox" class="task-checkbox" ' + 
                       (task.completed ? 'checked' : '') + '>' +
                       '<span class="task-text">' + task.text + '</span>' +
                       '<button class="task-delete-btn">حذف</button>';

        // إضافة حدث الضغط على checkbox
        var checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', function() {
            toggleTask(task.id);
        });

        // إضافة حدث الضغط على زر الحذف
        var deleteBtn = li.querySelector('.task-delete-btn');
        deleteBtn.addEventListener('click', function() {
            deleteTask(task.id);
        });

        taskList.appendChild(li);
    });
}

// دالة لتحديث الإحصائيات
function updateStats() {
    var tasks = getTasks();
    var completedCount = tasks.filter(function(task) {
        return task.completed;
    }).length;
    var pendingCount = tasks.length - completedCount;

    document.getElementById('totalTasks').textContent = tasks.length;
    document.getElementById('completedTasks').textContent = completedCount;
    document.getElementById('pendingTasks').textContent = pendingCount;
}

// دالة لتحميل المهام عند فتح الصفحة
function loadTasks() {
    displayTasks();
    updateStats();
}
