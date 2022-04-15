//
//  Websites.swift
//  customblock (iOS)
//
//  Created by wov on 2022/4/15.
//

import SwiftUI

struct Websites: View {
    
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
                    Link("哔哩哔哩", destination: URL(string: "https://www.bilibili.com")!)
                    Spacer()
                    HStack {
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
            
            Section( header: Text("图标说明")){
                HStack{
                    Image(systemName: "puzzlepiece.extension")
                    Spacer()
                    Text("针对该网站做过特殊的优化")
                }
                
                HStack{
                    Image(systemName: "moon.stars.fill")
                    Spacer()
                    Text("跟随系统的暗黑模式")
                }
                
                HStack{
                    Image(systemName: "desktopcomputer")
                    Spacer()
                    Text("优化了PC样式的显示")
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
