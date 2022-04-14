//
//  CustomBlockWebView.swift
//  customblock
//
//  Created by 孟 智 on 2022/4/14.
//

import SwiftUI
import WebKit

struct CustomWebView: UIViewRepresentable {
    
    var url: URL
    
    func makeUIView(context: Context) -> WKWebView {
        return WKWebView()
    }
    
    func updateUIView(_ uiView: UIViewType, context: Context) {
        uiView.loadFileURL(url, allowingReadAccessTo: Bundle.main.resourceURL!)
    }
}

