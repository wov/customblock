//
//  SceneDelegate.swift
//  iOS (App)
//
//  Created by wov on 2021/6/12.
//

import UIKit
import SwiftUI

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = (scene as? UIWindowScene) else { return }
        
        window = UIWindow(frame: windowScene.coordinateSpace.bounds)
        window?.windowScene = windowScene
        
      
        let newViewController = UIHostingController(rootView: ContentView())
        window?.rootViewController = newViewController
        window?.makeKeyAndVisible()
        
    }

}
