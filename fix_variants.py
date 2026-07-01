import os
import re

files = [
    "ChicTechTemplate.client.tsx",
    "CinematicTemplate.client.tsx",
    "CorporateAITemplate.client.tsx",
    "FuturisticTemplate.client.tsx",
    "MinimalTemplate.client.tsx",
    "PremiumTemplate.client.tsx",
    "ProfessionalPortfolioTemplate.client.tsx",
    "RoboticsPortfolioTemplate.client.tsx"
]

dir_path = "/home/montassar/my-ai-portfolio/src/app/p/[slug]"

variant_names = [
    "springReveal", "staggerContainer", "floatingAnimation",
    "fadeUpSlow", "slowFade", "fadeUp", "slideUp", "slideRight", "slideLeft",
    "staggerFast", "revealSharp", "rigidStep"
]

for filename in files:
    path = os.path.join(dir_path, filename)
    if not os.path.exists(path):
        continue
        
    with open(path, "r") as f:
        content = f.read()
        
    for v in variant_names:
        # replace `const variantName = {` with `const variantName: any = {`
        content = re.sub(rf'const {v}\s*=\s*\{{', f'const {v}: any = {{', content)
        
    # fix smoothEase
    content = re.sub(r'const smoothEase\s*=\s*\[', r'const smoothEase: any = [', content)
    
    with open(path, "w") as f:
        f.write(content)

print("Fixed variants in all templates.")
