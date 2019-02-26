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
        repo: 'victor0210/slim',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        locales: {
            '/': {
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                selectText: 'Languages',
                label: 'English',
                nav: [
                    {text: 'Guide', link: '/intro'},
                    {text: 'API', link: '/slimApi'}
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
                            ['/action.html', 'Action'],
                            ['/plugin', 'Plugin'],
                            ['/event', 'EventCenter']
                        ]
                    },
                    ['/slimApi', 'API'],
                    ['/controlLevel', 'Mode'],
                    ['/vslim', 'VSlim'],
                    ['/rslim', 'RSlim'],
                    ['/devtool', 'Slim-DevTools']
                ]
            },
            '/zh/': {
                editLinkText: '帮助我们改善此页面！',
                lastUpdated: '最近一次更新',
                selectText: '选择语言',
                label: '简体中文',
                nav: [
                    {text: '指南', link: '/zh/intro.html'},
                    {text: '接口文档', link: '/zh/slimApi.html'}
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
                            ['/zh/action.html', 'Action'],
                            ['/zh/plugin.html', 'Plugin'],
                            ['/zh/event', 'EventCenter']
                        ]
                    },
                    ['/zh/slimApi.html', 'API'],
                    ['/zh/controlLevel.html', '限制级别'],
                    ['/zh/vslim', 'VSlim'],
                    ['/zh/rslim', 'RSlim'],
                    ['/zh/devtool', '状态记录工具']
                ]
            }
        }
    }
}
