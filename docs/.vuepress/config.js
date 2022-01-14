module.exports = {
    title: '个人博客',//标题
    description: '记录点东西',
    // 一些好用的插件
    plugins: {
        // 菜单高亮
        '@vuepress/active-header-links':{
            sidebarLinkSelector: '.sidebar-link',
            headerAnchorSelector: '.header-anchor'
        },
        // 返回顶部
        '@vuepress/back-to-top': true,
        // 进度条
        '@vuepress/nprogress': true,
        // 图片放大
        '@vuepress/medium-zoom': true
    },
    themeConfig: {
      nav: [
        {text: 'github',link: 'https://github.com/tyj-321'}
      ],
      sidebar: [
          '/menu/introduction.md',
          {
            title: '一些总结',
            path: '/menu/v-modelSkill.html',
            collapsable: false,
            children: [
              '/menu/v-modelSkill.md',
              '/menu/debounce&throttle.md',
              '/menu/Vxoauth.md',
              '/menu/Mobilefit.md',
              '/menu/cssLayout.md',
              '/menu/VueReactive.md',
              '/menu/Typescript.md',
              '/menu/Docker.md',
              '/menu/workSummary.md',
              '/menu/composition-api.md',
              '/menu/jsextend.md',
              '/menu/modulefederation.md',
              '/menu/mixins-vuex.md',
              '/menu/learnroad.md',
              '/menu/event-loop.md',
              '/menu/codeStyle.md',
              '/menu/internet.md',
              '/menu/less-scss.md',
              '/menu/vscodePlugin.md',
              '/menu/chromePlugin.md',
              '/menu/dataType.md'
            ]
          },
          '/menu/teamBuild.md',
          '/menu/teamWork.md',
        ]
    }
  }