const ApiName = {
        // 用户和实习接口
        userLogin: "/user/login", //用户登陆
        userInfo: "/user/info", // 用户信息
        userChangeInfo: "/user/changeInfo", // 用户信息
        userRepassword: "/user/repassword", // 改密码
        
        studentPractice: "/student/practice", //学生实习信息
        studentPublicPractice: "/student/publicPractice", // 发布实习信息
        teacherPractices: "/teacher/practices", // 老师的学生们实习

        // 功能接口
        employInfo: "/employ/info", // 招聘信息
        employPublish: "/employ/publish", // 发布招聘
        boardGetQuestions: "/board/getQuestions", //所有问题信息
        boardGetQuestion: "/board/getQuestion", //当前问题
        boardGetComments: "/board/getComments", //当前评论
        boardGetReplys: "/board/getReplys", //当前回复
        boardPublicQuestion: "/board/publicQuestion", // 发布问题
        boardPublicComment: "/board/publicComment", // 发布评论
        boardPublicReply: "/board/publicReply", // 发布回复
        schoolNews: "/school/news", // 校园风采
        schoolClassStudents: "/school/classStudents", // 班级名单

        // 管理员接口
        publicNews: "/public/news", // 发布新闻
        deleteNews: "/delete/news", // 删除新闻
        deleteEmploy: "/delete/employ", // 删除招聘
        deleteQuestion: "/delete/question", // 删除论坛话题
        deleteNotice: "/delete/notice", // 删除公告
        noticeInfo: "/info/notice", //查询公告

        excelExport: "/teacher/excelExport", //下载excel表
        publicNotice: "/public/notice",  // 发布公告
        studentNotices: "/student/notices",  // 查询所有公告
        noticesNewNum: '/student/noticesNewNum', // 新公告数量

        //毕业设计
        teacherDesign: "/teacher/designs", // 获取该老师的所有题目
        publishDesign: "/design/publish", // 老师发布/删除题目
        selectDesignStudent: "/teacher/selectStudent", // 老师选择/取消选择学生
        getTeachers: "/teacher/all", // 获取所有老师
        getStudentDesign: "/student/selecteds", // 获取该学生的选择的题目
        selectDesign: "/student/selectDesign", // 学生选择/取消选择题目

        getGrade: "/student/grade", // 获取所有年级和班级
}

export default ApiName