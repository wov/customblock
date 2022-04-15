//
//  Privacy.swift
//  customblock (iOS)
//
//  Created by wov on 2022/4/15.
//

import SwiftUI

struct Privacy: View {
    
    var body: some View {
        VStack {
            Text("隐私保护")
                .font(.title)
            Spacer()
            Text("对于一个浏览器扩展来说，隐私保护显得尤为重要。\n布丁扩展承诺不会追踪、收集您的任何数据。\n您完全可以关闭布丁扩展的网络权限且不影响使用。\n关闭网络权限的方法为\"设置>布丁>无线数据>关闭\"。")
            Spacer()
        }
    }
}

struct Privacy_Previews: PreviewProvider {
    static var previews: some View {
        Privacy()
    }
}
