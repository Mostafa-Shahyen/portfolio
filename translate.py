import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Core HTML tags
html = html.replace('<html lang="en">', '<html lang="ar" dir="rtl">')
html = html.replace('<link rel="stylesheet" href="css/style.css">', '<link rel="stylesheet" href="css/style.css">\n    <link rel="stylesheet" href="css/rtl.css">')
html = html.replace('<a href="index-ar.html" class="lang-toggle" aria-label="Arabic Version">AR</a>', '<a href="index.html" class="lang-toggle" aria-label="English Version">EN</a>')

# Navigation
html = re.sub(r'>About<', '>نبذة عني<', html)
html = re.sub(r'>Skills<', '>المهارات<', html)
html = re.sub(r'>Projects<', '>المشاريع<', html)
html = re.sub(r'>Contact<', '>تواصل معي<', html)

# Hero Section
html = html.replace("Hello, I'm", "مرحباً، أنا")
html = html.replace('Mostafa Hassan', 'مصطفى حسن')
# But wait, we shouldn't translate Mostafa Hassan in the og tags or maybe we should? Let's just do it in the body.
html = re.sub(r'<h1 class="hero-title reveal">Mostafa Hassan</h1>', '<h1 class="hero-title reveal">مصطفى حسن</h1>', html)
html = re.sub(r'<h2 class="hero-subtitle reveal">AI Engineering Student</h2>', '<h2 class="hero-subtitle reveal">طالب هندسة ذكاء اصطناعي</h2>', html)
html = re.sub(r'ML &middot; CV &middot; NLP', 'تعلم الآلة &middot; الرؤية الحاسوبية &middot; معالجة اللغات الطبيعية', html)
html = re.sub(r'Building intelligent systems.*?architectures\.', 'شغوف ببناء الأنظمة الذكية واستكشاف تقنيات تعلم الآلة والرؤية الحاسوبية لحل المشكلات المعقدة بأحدث البنى البرمجية.', html, flags=re.DOTALL)
html = html.replace('>View Projects<', '>تصفح المشاريع<')
html = html.replace('>Download CV<', '>تحميل السيرة الذاتية<')

# Titles
html = re.sub(r'About Me(<span class="dot">\.</span>)?', r'نبذة عني\1', html)
html = re.sub(r'Skills(<span class="dot">\.</span>)?', r'المهارات\1', html)
html = re.sub(r'Education &amp; Experience(<span class="dot">\.</span>)?', r'التعليم والخبرات\1', html)
html = re.sub(r'AI Projects(<span class="dot">\.</span>)?', r'مشاريع الذكاء الاصطناعي\1', html)
html = re.sub(r'Let\'s Connect(<span class="dot">\.</span>)?', r'لنتواصل\1', html)

# About Text
html = re.sub(r'I\'m an AI Engineering student at Helwan International Technology University \(HITU\), passionate about building intelligent systems that solve real-world problems — from assistive technology for the visually impaired to voice-driven AI robots\.', 'أنا طالب بهندسة الذكاء الاصطناعي في جامعة حلوان الأهلية للتكنولوجيا (HITU)، شغوف ببناء أنظمة ذكية تحل مشاكل واقعية — بداية من التقنيات المساعدة للمكفوفين وحتى الروبوتات الموجهة بالصوت.', html)
html = re.sub(r'My work spans Machine Learning, Computer Vision, and NLP, with hands-on experience in hardware-software integration \(ESP32-CAM, custom robotics\), offline-first application design, and advanced audio synthesis\. I built MEMO — a voice-controlled AI robot — as my graduation project, and Baseet, an assistive mobile app for the visually impaired, among other production-grade projects\.', 'يمتد عملي ليشمل تعلم الآلة والرؤية الحاسوبية ومعالجة اللغات، مع خبرة عملية في دمج العتاد والبرمجيات (مثل ESP32-CAM والروبوتات المخصصة)، وتصميم التطبيقات التي تعمل بدون إنترنت. قمت ببناء MEMO — روبوت ذكاء اصطناعي يعمل بالصوت — كمشروع تخرجي، بالإضافة لتطبيق "بسيط" المساعد للمكفوفين.', html)

# Skills categories
html = html.replace('>Programming<', '>البرمجة<')
html = html.replace('>AI / ML<', '>الذكاء الاصطناعي<')
html = html.replace('>Tools &amp; Hardware<', '>الأدوات والعتاد<')
html = html.replace('>GUI &amp; Web<', '>الواجهات والويب<')

# Wrap C++ with LRM to fix bidi
html = html.replace('C++', 'C++&lrm;')

# Education
html = html.replace('AI Department Student &bull; Education', 'طالب بقسم الذكاء الاصطناعي &bull; تعليم')
html = html.replace('Trainee (ML &amp; CV) &bull; Dec 2024 - Jan 2025', 'متدرب (تعلم الآلة والرؤية الحاسوبية) &bull; ديس 2024 - ينا 2025')
html = html.replace('Participant / Attendee &bull; 2024 - 2025', 'مشارك وحاضر &bull; 2024 - 2025')
html = html.replace('Helwan International Technology University', 'جامعة حلوان الأهلية للتكنولوجيا')
html = html.replace('Omal Misr Complex', 'مجمع عمال مصر')
html = html.replace('Tech Expo, Mark Academy &amp; Cairo ICT', 'معارض التكنولوجيا و Cairo ICT')

# Projects (Replace full descriptions)
html = re.sub(r'An AIoT assistive technology ecosystem.*?recognition\.', 'نظام تقني مساعد للمكفوفين يعتمد على AIoT. يدمج عتاد مخصص (ESP32-CAM) مع تطبيق موبايل "بسيط" يعمل بدون إنترنت، ويتميز بالتحكم الصوتي والتعرف على الوجوه.', html, flags=re.DOTALL)
html = re.sub(r'An advanced AI-powered voice processing system.*?synthesized voice\.', 'نظام معالجة صوتية متقدم بالذكاء الاصطناعي. يستخرج البصمات الصوتية من العينات الصوتية، مما يسمح لك بكتابة أي نص وتوليد خطاب متصل بنفس الصوت الاصطناعي.', html, flags=re.DOTALL)
html = re.sub(r'A smart desktop notebook featuring a built-in offline translation tool.*?productivity app\.', 'دفتر ملاحظات ذكي لسطح المكتب يتميز بأداة ترجمة مدمجة تعمل بدون إنترنت. تم تطويره في الأصل كحل شخصي لترجمة ألعاب الفيديو الروسية، وتطور ليصبح تطبيق إنتاجية متكامل.', html, flags=re.DOTALL)
html = re.sub(r'A hardware simulation of a Predictive Maintenance System.*?data analytics\.', 'محاكاة لعتاد نظام صيانة تنبؤية مدمج بمصعد. يتميز بلوحة تحكم مادية مخصصة ولوحة تحكم موبايل IoT للمراقبة اللحظية وتحليل البيانات.', html, flags=re.DOTALL)
html = re.sub(r'A fully professional web app that converts video files.*?WebM formats\.', 'تطبيق ويب احترافي بالكامل يحول ملفات الفيديو إلى صوت عالي الجودة داخل المتصفح بالكامل — بدون رفع على خوادم أو مخاطر خصوصية.', html, flags=re.DOTALL)
html = re.sub(r'An interactive AI-powered robotic assistant built from scratch.*?user experiences\.', 'روبوت مساعد تفاعلي بالذكاء الاصطناعي مبني من الصفر، يجمع بين مكونات العتاد المخصصة والتكامل البرمجي الذكي لتجارب مستخدم ديناميكية.', html, flags=re.DOTALL)

html = html.replace('Mobile App', 'تطبيق موبايل')
html = html.replace('ESP32 Hardware', 'عتاد ESP32')
html = html.replace('Voice Cloning', 'استنساخ الصوت')
html = html.replace('Audio Synthesis', 'توليد الصوت')
html = html.replace('Translation', 'ترجمة')
html = html.replace('Offline Tool', 'أداة أوفلاين')
html = html.replace('Predictive Maintenance', 'صيانة تنبؤية')
html = html.replace('Browser-side Processing', 'معالجة بالمتصفح')
html = html.replace('Web App', 'تطبيق ويب')
html = html.replace('Hardware', 'عتاد')
html = html.replace('Robotics', 'روبوتات')

# Project Titles
html = html.replace('Baseet&quot;&quot; App', 'تطبيق &quot;بسيط&quot; للمكفوفين')
html = html.replace('StudyGenius Voice', 'منصة StudyGenius الصوتية')
html = html.replace('Offline Translation &amp; Note-Taking App', 'تطبيق الترجمة والملاحظات الأوفلاين')
html = html.replace('(SCEM)', '(SCEM)')
html = html.replace('Video to Audio', 'محول الفيديو إلى صوت')
html = html.replace('MEMO Assistant', 'الروبوت المساعد MEMO')

# Buttons in projects
html = html.replace('View Details', 'عرض التفاصيل')
html = html.replace('Watch Video', 'مشاهدة الفيديو')
html = html.replace('View Live App', 'تجربة التطبيق')
html = html.replace('View on LinkedIn', 'عرض على لينكدإن')

# Contact Section
html = re.sub(r'I\'m always open to discussing AI projects, collaboration opportunities, or internship roles\. Feel free to reach out\.', 'أنا مستعد دائماً لمناقشة مشاريع الذكاء الاصطناعي، فرص التعاون، أو التدريب. لا تتردد في التواصل معي.', html)
html = html.replace('placeholder="Name"', 'placeholder="الاسم"')
html = html.replace('placeholder="Email"', 'placeholder="البريد الإلكتروني"')
html = html.replace('placeholder="Subject"', 'placeholder="الموضوع"')
html = html.replace('placeholder="Message"', 'placeholder="الرسالة"')
html = html.replace('Send Message', 'إرسال رسالة')

with open('index-ar.html', 'w', encoding='utf-8') as f:
    f.write(html)
