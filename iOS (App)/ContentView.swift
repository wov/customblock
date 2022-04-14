//
//  ContentView.swift
//  customblock
//
//  Created by 孟 智 on 2022/4/14.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        let url = Bundle.main.url(forResource: "Main", withExtension: "html")!
        CustomWebView(url:url)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
