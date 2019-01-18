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
            ['/installation.html', '安装'],
            ['/intro.html', '介绍'],
            ['/guide/', '快速开始']
        ]
    }
}
