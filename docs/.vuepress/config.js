module.exports = {
    base: '/slimdocs/',
    head: [
        ['link', { rel: 'slim icon', type: "image/x-icon", href: `/favicon.ico` }]
    ],
    locales: {
        '/': {
            title: 'Slim',
            description: 'Slim: Centralized State Management With Proxy, State-Non-Editable.'
        },
        '/zh/': {
            title: 'Slim',
            description: 'Slim: Centralized State Management With Proxy, State-Non-Editable.'
        }
    },
    themeConfig: {
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                nav: [
                    {text: 'Guide', link: '/intro'},
                    {text: 'API', link: '/slimApi'},
                    {text: 'Github', link: 'https://github.com/victor0210/slim'}
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
                            ['/plugin', 'Plugin'],
                            ['/event', 'EventCenter']
                        ]
                    },
                    ['/slimApi', 'API'],
                    ['/controlLevel', 'Mode'],
                    ['/vslim', 'VSlim']
                ]
            },
            '/zh/': {
                selectText: '选择语言',
                label: '简体中文',
                nav: [
                    {text: '指南', link: '/zh/intro.html'},
                    {text: '接口文档', link: '/zh/slimApi.html'},
                    {text: '代码仓库', link: 'https://github.com/victor0210/slim'}
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
                            ['/zh/plugin.html', 'Plugin'],
                            ['/zh/event', 'EventCenter']
                        ]
                    },
                    ['/zh/slimApi.html', 'API'],
                    ['/zh/controlLevel.html', '限制级别'],
                    ['/zh/vslim', 'VSlim']
                ]
            }
        }
    }
}
