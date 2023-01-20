//
//  TutorialPC.swift
//  customblock (iOS)
//
//  Created by wov on 2023/1/11.
//

import SwiftUI

struct TutorialPC: View {
    var body: some View {
        VStack {
            Text("在Safari中点击“大小”，点击请求桌面网站")
            Image("pc")
                .resizable()
                .scaledToFit()
        }
    }
}

struct TutorialPC_Previews: PreviewProvider {
    static var previews: some View {
        TutorialPC()
    }
}
