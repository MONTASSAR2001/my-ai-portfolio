import { Code, FileText, Mail, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-foreground mb-3">About</h3>
            <p className="text-sm text-muted-foreground">
              Passionate about building intelligent autonomous systems and pushing the boundaries of robotics and AI technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Projects</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Research</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all group">
                <Code className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all group">
                <FileText className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all group">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all group">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Robotics Engineer. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
