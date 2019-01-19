module.exports = {
    title: 'Slim',
    description: 'Slim: Centralized State Management With Proxy, State-Non-Editable.',
    themeConfig: {
        // 添加导航栏
        nav: [
            {text: '指南', link: '/guide/'},
            {text: 'API', link: '/api'},
            {
                text: '语言', items: [
                    {text: 'zh', link: '/xx'},
                    {text: 'en', link: '/xxx'}
                ]
            },
            {text: 'github', link: 'https://github.com/victor0210/slim'}
        ],
        sidebar: [
            {
                title: '快速开始',
                collapsable: false,
                children: [
                    ['/intro', '介绍'],
                    ['/installation', '安装']
                ]
            },
            {
                title: '核心模块',
                collapsable: false,
                children: [
                    ['/state', 'State'],
                    ['/draft', 'Draft'],
                    ['/reducer', 'Reducer'],
                    ['/subscribe', 'Subscribe'],
                    ['/plugin', 'Plugin']
                ]
            },
            ['/slimApi', 'API']
        ]
    }
}
