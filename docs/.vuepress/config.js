module.exports = {
    base: '/slimdocs/',
    head: [
        ['link', { rel: 'slim icon', type: "image/x-icon", href: `/favicon.ico` }]
    ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Slim',
            description: 'Slim: Centralized State Management With Proxy, State-Non-Editable.'
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Slim',
            description: 'Slim: Centralized State Management With Proxy, State-Non-Editable.'
        }
    },
    themeConfig: {
        locales: {
            '/': {
                nav: [
                    {text: 'Guide', link: '/intro'},
                    {text: 'API', link: '/slimApi'},
                    {
                        text: 'Language', items: [
                            {text: 'English', link: '/'},
                            {text: '简体中文', link: '/zh/'}
                        ]
                    },
                    {text: 'github', link: 'https://github.com/victor0210/slim'}
                ],
                sidebar: [
                    {
                        title: 'QuickStart',
                        collapsable: false,
                        children: [
                            ['/intro', 'Introduction'],
                            ['/installation', 'Installation']
                        ]
                    },
                    {
                        title: 'Core Modules',
                        collapsable: false,
                        children: [
                            ['/state', 'State'],
                            ['/reducer', 'Reducer'],
                            ['/subscribe', 'Subscribe'],
                            ['/plugin', 'Plugin']
                        ]
                    },
                    ['/slimApi', 'API'],
                    ['/controlLevel', 'Mode']
                ]
            },
            '/zh/': {
                nav: [
                    {text: '指南', link: '/zh/intro.html'},
                    {text: 'API', link: '/zh/slimApi.html'},
                    {
                        text: '语言', items: [
                            {text: 'English', link: '/'},
                            {text: '简体中文', link: '/zh/'}
                        ]
                    },
                    {text: 'github', link: 'https://github.com/victor0210/slim'}
                ],
                sidebar: [
                    {
                        title: '快速开始',
                        collapsable: false,
                        children: [
                            ['/zh/intro.html', '介绍'],
                            ['/zh/installation.html', '安装']
                        ]
                    },
                    {
                        title: '核心模块',
                        collapsable: false,
                        children: [
                            ['/zh/state.html', 'State'],
                            ['/zh/reducer.html', 'Reducer'],
                            ['/zh/subscribe.html', 'Subscribe'],
                            ['/zh/plugin.html', 'Plugin']
                        ]
                    },
                    ['/zh/slimApi.html', 'API'],
                    ['/zh/controlLevel.html', '限制级别']
                ]
            }
        }
    }
}
