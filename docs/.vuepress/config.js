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
          {
            title: '2022',
            path: '/menu/2022/async&await.html',
            collapsable: false,
            children: [
              '/menu/2022/async&await.md',
              '/menu/2022/weixinOauth.md',
              '/menu/2022/VirtualDOM&Diff.md',
              '/menu/2022/debugger.md',
              '/menu/2022/css-box.md',
              '/menu/2022/Browser-cache.md',
            ]
          },
          {
            title: '2021',
            path: '/menu/2021/2021review.html',
            collapsable: true,
            children: [
              '/menu/2021/2021review.md',
              '/menu/2021/v-modelSkill.md',
              '/menu/2021/debounce&throttle.md',
              '/menu/2021/Mobilefit.md',
              '/menu/2021/cssLayout.md',
              '/menu/2021/VueReactive.md',
              '/menu/2021/Typescript.md',
              '/menu/2021/Docker.md',
              '/menu/2021/composition-api.md',
              '/menu/2021/jsextend.md',
              '/menu/2021/modulefederation.md',
              '/menu/2021/mixins-vuex.md',
              '/menu/2021/learnroad.md',
              '/menu/2021/event-loop.md',
              '/menu/2021/codeStyle.md',
              '/menu/2021/internet.md',
              '/menu/2021/less-scss.md',
              '/menu/2021/vscodePlugin.md',
              '/menu/2021/chromePlugin.md',
              '/menu/2021/dataType.md',
              '/menu/2021/workSummary.md',
              '/menu/2021/teamBuild.md',
              '/menu/2021/teamWork.md',
            ]
          }
        ]
    }
  }