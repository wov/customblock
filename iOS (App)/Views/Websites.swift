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
    
    var body: some View {
        List{
            Section( header: Text("支持的网站")){
                Group{
                    HStack {
                        Link("百度", destination: URL(string: "https://baidu.com")!)
                        
                        Spacer()
                        HStack {
                            Image(systemName: "puzzlepiece.extension")
                            Image(systemName: "moon.stars.fill")
                        }
                    }
                    
                    HStack {
                        Link("豆瓣电影", destination: URL(string: "https://movie.douban.com")!)
                        
                        Spacer()
                        HStack {
                            Image(systemName: "desktopcomputer")
                            Image(systemName: "moon.stars.fill")
                        }
                    }
                    
                    HStack {
                        Link("哔哩哔哩", destination: URL(string: "https://m.bilibili.com")!)
                        
                        Spacer()
                        HStack {
                            Image(systemName: "puzzlepiece.extension")
                            Image(systemName: "desktopcomputer")
                        }
                    }
                    
                    HStack {
                        Link("新浪微博", destination: URL(string: "https://m.weibo.cn")!)
                        
                        Spacer()
                        HStack {
                            Image(systemName: "moon.stars.fill")
                        }
                    }
                    
                    HStack {
                        Link("网易新闻", destination: URL(string: "https://3g.163.com")!)
                        
                        Spacer()
                        HStack {
                            
                            Image(systemName: "speedometer")
                            Image(systemName: "puzzlepiece.extension")
                            Image(systemName: "moon.stars.fill")
                        }
                    }
                    
                    HStack {
                        Link("腾讯新闻", destination: URL(string: "https://xw.qq.com")!)
                        
                        Spacer()
                        HStack {
                            Image(systemName: "moon.stars.fill")
                        }
                    }
                    
                    HStack {
                        Link("知乎", destination: URL(string: "https://www.zhihu.com")!)
                        
                        Spacer()
                        HStack {
                            Image(systemName: "puzzlepiece.extension")
                            Image(systemName: "moon.stars.fill")
                        }
                    }
                    
                    HStack {
                        Link("36氪", destination: URL(string: "https://m.36kr.com")!)
                        
                        Spacer()
                        HStack {
                            Image(systemName: "puzzlepiece.extension")
                            Image(systemName: "moon.stars.fill")
                        }
                    }
                    
                    HStack {
                        Link("爱范儿", destination: URL(string: "https://www.ifanr.com")!)
                        
                        Spacer()
                        HStack {
                            Image(systemName: "moon.stars.fill")
                        }
                    }
                    
                    HStack {
                        Link("什么值得买", destination: URL(string: "https://smzdm.com")!)
                        Spacer()
                        HStack {
                            Image(systemName: "puzzlepiece.extension")
                        }
                    }
                    
                }
                
                Group{
                    HStack {
                        Link("管家婆", destination: URL(string: "https://passport.wsgjp.com.cn/erp/login")!)
                        Spacer()
                        HStack {
                            Image(systemName: "desktopcomputer")
                        }
                    }
                }
            }
            
            Section( header: Text("图标说明")){
                HStack{
                    Image(systemName: "puzzlepiece.extension")
                    Spacer()
                    VStack(alignment: .trailing){
                        Text("针对该网站做过特殊的优化")
                            .font(.footnote)
                        Text("去广告、默认展开、屏蔽等")
                            .font(.footnote)
                            .foregroundColor(Color.gray)
                    }
                }
                
                HStack{
                    Image(systemName: "moon.stars.fill")
                    Spacer()
                    VStack(alignment: .trailing){
                        Text("跟随系统的暗黑模式")
                            .font(.footnote)
                        Text("系统处于暗黑模式时自动适配")
                            .font(.footnote)
                            .foregroundColor(Color.gray)
                    }
                }
                
                HStack{
                    Image(systemName: "desktopcomputer")
                    Spacer()
                    VStack(alignment: .trailing){
                        Text("优化了PC样式的显示")
                            .font(.footnote)
                        VStack {
                            HStack {
                                Text("点击")
                                Image(systemName:"textformat")
                                Text("> 请求桌面网站")
                                Image(systemName:"desktopcomputer")
                            }
                        }
                        .font(.footnote)
                        .foregroundColor(Color.gray)
                        
                    }
                }
                
                HStack{
                    Image(systemName: "speedometer")
                    Spacer()
                    VStack(alignment: .trailing){
                        Text("性能优化")
                            .font(.footnote)
                        Text("解决浏览器可能会崩溃的问题")
                            .font(.footnote)
                            .foregroundColor(Color.gray)
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
