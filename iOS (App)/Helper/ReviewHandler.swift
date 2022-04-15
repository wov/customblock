//
//  ReviewHandler.swift
//  customblock (iOS)
//
//  Created by wov on 2022/4/15.
//

import Foundation
import StoreKit


class ReviewHandler {
    
    static func requestReview() {
        // next step here
    }
    
    static func requestReviewManually() {
      // TODO: replace xxxxxxxxxx in the following URL with your Apps Apple ID
      let url = "https://apps.apple.com/app/id1586983153?action=write-review"
      guard let writeReviewURL = URL(string: url)
          else { fatalError("Expected a valid URL") }
      UIApplication.shared.open(writeReviewURL, options: [:], completionHandler: nil)
    }

    
    
}
