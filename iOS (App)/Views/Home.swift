//
//  Home.swift
//  customblock (iOS)
//
//  Created by wov on 2022/4/15.
//

import SwiftUI

struct Home: View {
    private func sendMail() {
        let mailtoString = "mailto:wovfeng@gmail.com".addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        let mailtoUrl = URL(string: mailtoString!)!
        if UIApplication.shared.canOpenURL(mailtoUrl) {
                UIApplication.shared.open(mailtoUrl, options: [:])
        }
    }
    
    var body: some View {
        NavigationView{
            List{
                Section(header: Text("说明")){
                    NavigationLink {
                        Tutorial()
                    } label: {
                        Text("如何使用")
                    }
                    
                    NavigationLink {
                        TutorialPC()
                    } label: {
                        Text("如何访问B站等PC版")
                    }
                    
                    NavigationLink {
                        Websites()
                    } label: {
                        Text("支持的网站")
                    }
                    
                    NavigationLink {
                        Privacy()
                    } label: {
                        Text("隐私保护")
                    }
                }
                
                Section(header: Text("留言反馈")){
                    Button(action: sendMail){
                        HStack {
                            Image(systemName: "envelope")
                            Text("反馈需求")
                        }
                    }
                    
                    
                    Button(action: {
                        ReviewHandler.requestReviewManually()
                    }) {
                        HStack {
                            Image(systemName: "square.and.pencil")
                            Text("撰写评论")
                        }
                    }
                    .onAppear(perform: {
                        ReviewHandler.requestReview()
                    })
                    
//                    HStack {
//                        Link("微博互动", destination: URL(string: "https://weibo.com/u/1681934680")!)
//                    }
//
                }
            }
            .listStyle(GroupedListStyle())

            .navigationBarTitle("布丁扩展", displayMode: .inline)

        }
        
        
    }
}

struct Home_Previews: PreviewProvider {
    static var previews: some View {
        Home()
    }
}
