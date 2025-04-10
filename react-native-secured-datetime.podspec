Pod::Spec.new do |s|
    s.name         = "react-native-secured-datetime"
    s.version      = "1.0.0"
    s.summary      = "Secure and reliable datetime based on elapsedRealtime"
    s.description  = <<-DESC
                     A lightweight React Native module to compute a secure datetime based on trusted server time
                     and native elapsedRealtime, to prevent cheating or local clock manipulation.
                     DESC
    s.homepage     = "https://github.com/yourusername/react-native-secured-datetime"
    s.license      = { :type => "MIT", :file => "LICENSE" }
    s.author       = { "nicolastorre" => "https://github.com/nicolastorre" }
    s.platform     = :ios, "10.0"
    s.source       = { :git => "https://github.com/yourusername/react-native-secured-datetime.git", :tag => "#{s.version}" }
    s.source_files = "ios/**/*.{h,m}"
    s.requires_arc = true
    s.dependency "React-Core"
  end
  