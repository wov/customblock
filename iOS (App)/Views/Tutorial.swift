//
//  Tutorial.swift
//  customblock (iOS)
//
//  Created by wov on 2022/4/15.
//

import SwiftUI

struct Tutorial: View {
    var body: some View {
        VStack {
            Text("在“设置>Safari浏览器>扩展”中允许扩展")
            Image("step1")
                .resizable()
                .scaledToFit()
                
            Text("在Safari中点击“大小”，允许扩展修改网页")
            Image("step2")
                .resizable()
                .scaledToFit()
        }
    }
}

struct Tutorial_Previews: PreviewProvider {
    static var previews: some View {
        Tutorial()
    }
}
