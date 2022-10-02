//
//  Websites.swift
//  customblock (iOS)
//
//  Created by wov on 2022/4/15.
//

import SwiftUI

struct Websites: View {
    @Environment(\.openURL) var openURL
    
    private func sendMail() {
        let mailtoString = "mailto:wovfeng@gmail.com".addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        let mailtoUrl = URL(string: mailtoString!)!
        if UIApplication.shared.canOpenURL(mailtoUrl) {
            UIApplication.shared.open(mailtoUrl, options: [:])
        }
    }
    
    enum types : CaseIterable {
        case additional
        case dark
        case pc
        case speed
        case video
        
        var icon: Image {
            switch self {
            case .additional:
                return Image(systemName: "puzzlepiece.extension")
            case .dark:
                return Image(systemName: "moon.stars.fill")
            case .pc:
                return  Image(systemName: "desktopcomputer")
            case .speed:
                return Image(systemName: "speedometer")
            case .video:
                return Image(systemName: "play.circle")
            }
        }
        
        var describe: String {
            switch self {
            case .additional:
                return "针对该网站做过特殊的优化"
            case .dark:
                return "跟随系统的暗黑模式"
            case .pc:
                return "优化了PC样式的显示"
            case .speed:
                return "性能优化"
            case .video:
                return "原生播放控件"
            }
        }
        
        var note: String {
            switch self {
            case .additional:
                return "去广告、默认展开、屏蔽等"
            case .dark:
                return "系统处于暗黑模式时自动适配"
            case .pc:
                return "点击\"大小\">请求桌面网站"
            case .speed:
                return "解决浏览器可能会崩溃的问题"
            case .video:
                return "可开启全屏、画中画、投屏等"
            }
        }
    }
    
    struct WebSite{
        let id =  UUID()
        var name: String
        var url: String
        var types : [types]
    }
    
    var body: some View {
        let websites:[WebSite] = [
            WebSite(name:"百度",url: "https://baidu.com",types: [.additional,.dark]),
            WebSite(name:"豆瓣电影",url: "https://movie.douban.com",types: [.pc,.dark]),
            WebSite(name:"哔哩哔哩",url: "https://m.bilibili.com",types: [.additional,.video,.pc]),
            WebSite(name:"新浪微博",url: "https://m.weibo.cn",types: [.additional,.dark]),
            WebSite(name:"网易新闻",url: "https://3g.163.com",types: [.speed,.additional,.dark]),
            WebSite(name:"腾讯新闻",url: "https://xw.qq.com",types: [.dark]),
            WebSite(name:"知乎",url: "https://www.zhihu.com",types: [.additional,.dark]),
            WebSite(name:"36氪",url: "https://m.36kr.com",types: [.additional,.dark]),
            WebSite(name:"爱范儿",url: "https://www.ifanr.com",types: [.dark]),
            WebSite(name:"什么值得买",url: "https://smzdm.com",types: [.additional]),
            WebSite(name:"管家婆",url: "https://passport.wsgjp.com.cn/erp/login",types: [.pc]),
            WebSite(name:"千牛后台",url: "https://myseller.taobao.com/",types: [.pc]),
            WebSite(name:"汽车之家",url: "https://m.autohome.com.cn",types: [.additional,.video]),
            WebSite(name:"淘宝网",url: "https://taobao.com",types: [.additional]),
            WebSite(name:"点评网",url: "https://m.dianping.com",types: [.additional]),
            WebSite(name:"csdn",url: "https://blog.csdn.net",types: [.additional])

        ]
        
        List{
            Section( header: Text("支持的网站(没有适配iPad)")){
                Group{
                    ForEach(websites, id: \.id ) { site in
                        HStack {
                            Link(site.name, destination: URL(string: site.url)!)
                            Spacer()
                            HStack {
                                ForEach( site.types, id: \.self ){ type in
                                    type.icon
                                }
                            }
                        }
                    }
                }
            }
            
            Section( header: Text("图标说明")){
                Group{
                    ForEach(types.allCases, id: \.self ){ type in
                        HStack{
                            Text("")
                            type.icon
                            Spacer()
                            VStack(alignment: .trailing){
                                Text( type.describe )
                                    .font(.footnote)
                                Text( type.note )
                                    .font(.footnote)
                                    .foregroundColor(Color.gray)
                            }
                            
                        }
                    }
                }
            
            }
            
            Section( header: Text("提交需求")){
                Button(action: sendMail){
                    HStack {
                        Image(systemName: "envelope")
                        Text("反馈需求")
                    }
                }
            }
        }
        .listStyle(GroupedListStyle())
        
    }
}

struct Websites_Previews: PreviewProvider {
    static var previews: some View {
        Websites()
    }
}
