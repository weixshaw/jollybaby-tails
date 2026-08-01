/* ============================================================
 * Jollybaby 尾巴书乐园 - 书籍数据
 *
 * 想增加书 / 修改文案：直接在这里改。
 * - pages: 每页 { icon, zh, en }，zh/en 为完整故事文案（每页 2-4 句）
 * - audio: 音频文件路径，把 mp3 放进 audio/ 目录即可
 * - videos: 可选，视频链接（详情页会显示"讲解视频"区）
 *   { title, url, desc }
 * - pageStarts: 可选，每页开始秒数（如 [0, 27, 55, ...]），
 *   用于字幕精确对齐。不填则按播放时长均分
 *   （英文音频由 scripts/gen_audio_tts.py 自动生成精确时间轴，
 *    无需手动填；中文字幕建议用官方音频时手动校准）
 * ============================================================ */

const BOOKS = [
  {
    id: "jungle",
    cover: "images/covers/jungle.jpg",
    zh: "丛林尾巴",
    en: "Jungle Tails",
    emoji: "🌴",
    tagline: "鹦鹉 · 大象 · 老虎 · 斑马……8 种丛林动物",
    audio: {
      zh: "audio/jungle-zh.mp3",
      en: "audio/jungle-en.mp3"
    },
    videos: [
      { title: "《丛林里的狂欢派对》（官方中文）", url: "https://www.bilibili.com/video/BV1TaArzWE7v", desc: "Jollybaby 官方号 · 3:40" },
      { title: "丛林尾巴书双语完整带读（参考）", url: "https://www.bilibili.com/video/BV1EY4y1R7WX", desc: "水熊妈咪 · 3:56 · 英文音频为 AI 朗读完整故事" }
    ],
    pages: [
      {
        icon: "🦜",
        zh: "清晨的丛林里，传来一阵清脆的歌声：“你好呀，你好呀！”原来是绿油油的鹦鹉，拖着一条长长的漂亮尾巴，站在枝头上，把森林里的小伙伴们都叫醒了。",
        en: "Early in the morning, a cheerful voice rings through the jungle: “Hello! Hello!” It is the green parrot, with a long, bright tail, singing on a branch to wake up all its friends."
      },
      {
        icon: "🐘",
        zh: "大象摇着蒲扇般的大耳朵，慢悠悠地走了过来。“咚咚咚”，它的脚步震得树叶都轻轻发抖。它的尾巴细细的，尾巴尖上还有一撮小毛穗，一摇一摇的，真可爱。",
        en: "The elephant ambles over, flapping his big fan-like ears. Thump, thump — his heavy steps make the leaves tremble. His tail is thin and tiny, with a little tuft of hair at the end, swaying side to side."
      },
      {
        icon: "🦝",
        zh: "咦，是谁戴着黑黑的小眼罩？是浣熊呀！它蹑手蹑脚地走到小河边，用毛茸茸的爪子洗洗食物。它的尾巴一圈一圈的，像一根漂亮的大羽毛。",
        en: "Who is wearing a little black mask? It is the raccoon! He tiptoes to the river to wash his food with his tiny paws. His tail is bushy and ringed, like a beautiful feather."
      },
      {
        icon: "🐯",
        zh: "“嗷呜——”一声大吼，大老虎从灌木丛里跳了出来！它披着黑黄条纹的花衣裳，尾巴又粗又长，走路的时候一摇一摆，威风极了。",
        en: "“Roar!” The great tiger leaps out of the bushes! He wears a coat of black and gold stripes and swings his long, strong tail as he walks. What a mighty king of the jungle!"
      },
      {
        icon: "🐵",
        zh: "树梢上传来“吱吱”的笑声，小猴子倒挂在藤蔓上荡来荡去，冲大家做鬼脸。它长长的尾巴卷成一个圈，像一个大大的问号：“要不要跟我一起玩呀？”",
        en: "Giggle, giggle! The little monkey swings from vine to vine, hanging upside down and making funny faces. He curls his long tail into a big question mark: “Would you like to play with me?”"
      },
      {
        icon: "🦒",
        zh: "小猴子抬头一看，哇，长颈鹿伸着长长的脖子，正够着树顶最嫩的叶子呢！它悠闲地嚼着树叶，尾巴尖上的一撮小毛刷，轻轻赶着讨厌的蚊虫。",
        en: "The monkey looks up — wow! The giraffe stretches her long neck to reach the juiciest leaves at the top of the tree. She chews slowly, flicking her tassel-tipped tail to brush away the buzzing flies."
      },
      {
        icon: "🦓",
        zh: "草地上，一群黑白条纹的斑马正在散步，远远看去，就像一幅会走路的画。小斑马甩一甩条纹尾巴，把落在身上的小飞虫赶得远远的。",
        en: "On the grassland, a herd of black-and-white zebras strolls by, looking like a walking painting. The baby zebra swishes his striped tail to chase the little flies away."
      },
      {
        icon: "🐊",
        zh: "太阳快落山了，丛林边的小河里，鳄鱼妈妈浮出了水面。它张着大嘴巴打了一个大大的哈欠，硬邦邦的尾巴像一把小锯子。它轻轻地说：“天黑了，小宝贝们，该回家睡觉啦。晚安，丛林！”",
        en: "The sun is setting. In the river by the jungle, Mama Crocodile rises from the water. She opens her big mouth in a wide yawn — her tail is strong and bumpy, like a little saw. She says softly: “It is getting dark, little ones. Time to go home and sleep. Good night, jungle!”"
      }
    ]
  },
  {
    id: "ocean",
    cover: "images/covers/ocean.jpg",
    zh: "海洋尾巴",
    en: "Ocean Tails",
    emoji: "🌊",
    tagline: "章鱼 · 海龟 · 鲸鱼 · 小丑鱼……8 种海洋动物",
    audio: {
      zh: "audio/ocean-zh.mp3",
      en: "audio/ocean-en.mp3"
    },
    videos: [
      { title: "海洋尾巴早教小故事（官方中文）", url: "https://www.bilibili.com/video/BV1wAAnzXEpZ", desc: "Jollybaby 官方号 · 2:10" },
      { title: "Ocean Tails 实物翻书（英文）", url: "https://www.youtube.com/watch?v=FZ-Y1G-6bgU", desc: "YouTube · 0:21 · 英文音频为 AI 朗读完整故事" }
    ],
    pages: [
      {
        icon: "🐙",
        zh: "蓝色的大海里，住着许多快乐的朋友。一朵“小花”随着海浪轻轻摇摆——原来是章鱼先生！它伸出八条软软的腕足，在水里一伸一缩，跳起了圆舞曲。",
        en: "In the big blue sea live many happy friends. A little “flower” sways with the waves — it is Mr. Octopus! He spreads his eight soft arms and dances, up and down, with the music of the ocean."
      },
      {
        icon: "🐢",
        zh: "慢吞吞的海龟爷爷背着重重的壳，从珊瑚礁后面游了出来。他游到哪里，就把家背到哪里。他对小章鱼说：“别着急，慢慢游，路上的风景最美。”",
        en: "Old Turtle swims slowly out from behind the coral reef, carrying his heavy shell. Wherever he goes, his home goes with him. He tells the little octopus: “Take your time, swim slowly — the journey is the most beautiful part.”"
      },
      {
        icon: "🦀",
        zh: "“咔嚓咔嚓”，沙滩上传来一阵脚步声。小螃蟹横着身子，举着两只大钳子，大摇大摆地走来走去，好像在对海浪说：“快看，我多神气！”",
        en: "Click, click! Little footsteps on the sandy beach. The crab walks sideways, waving his two big claws, strutting along as if to say to the waves: “Look at me — how proud I am!”"
      },
      {
        icon: "🐚",
        zh: "海草林里，小海马用卷卷的尾巴勾住一根海草，跟着海浪摇啊摇，就像在荡摇篮。它轻轻地说：“嘘——我要打个盹儿啦。”",
        en: "In the seagrass forest, little Seahorse curls his tail around a blade of grass and rocks with the waves, like a cradle. He whispers: “Shh — I am going to take a little nap.”"
      },
      {
        icon: "🐳",
        zh: "“哗啦——”一道水柱喷向天空，像一座会移动的小喷泉！大鲸鱼从深海里浮上来换气，它的歌声低沉悠扬，能传遍整个海洋。",
        en: "Whoosh! A fountain of water shoots into the sky, like a moving little fountain! The great whale rises from the deep to breathe. His song is deep and sweet, carrying all across the ocean."
      },
      {
        icon: "🪼",
        zh: "天黑了，海底却亮起了一盏盏小灯笼——是水母小姐们！她们穿着透明的果冻裙子，一伸一缩，在黑暗里跳着发光的舞蹈。",
        en: "When night falls, little lanterns light up the deep sea — it is the jellyfish ladies! Dressed in clear jelly dresses, they glow and dance through the dark water."
      },
      {
        icon: "🦈",
        zh: "水母们赶紧让到一边——鲨鱼大哥来巡游了！他露出尖尖的牙齿，在珊瑚礁外转了一圈，又摆摆尾巴游向远方。别怕，他只是出来散散步。",
        en: "The jellyfish quickly move aside — here comes Big Brother Shark! He shows his sharp teeth, circles once around the reef, wags his tail, and swims away. Do not worry, he is just out for a walk."
      },
      {
        icon: "🐠",
        zh: "天亮了，太阳照进海里。橙色条纹的小丑鱼从海葵里探出脑袋，大声说：“朋友们，新的一天开始啦，快出来玩吧！”大海又热闹起来。",
        en: "Morning comes, and sunlight pours into the sea. The little orange-striped clownfish peeks out of the anemone and calls: “Friends, a new day begins! Come out and play!” The ocean becomes lively again."
      }
    ]
  },
  {
    id: "farm",
    cover: "images/covers/farm.jpg",
    zh: "农场尾巴",
    en: "Farm Tails",
    emoji: "🚜",
    tagline: "奶牛 · 小马 · 绵羊 · 公鸡……8 种农场动物",
    audio: {
      zh: "audio/farm-zh.mp3",
      en: "audio/farm-en.mp3"
    },
    videos: [
      { title: "《开心农场》（官方中文）", url: "https://www.bilibili.com/video/BV12UPWzrEyJ", desc: "Jollybaby 官方号 · 5:02" },
      { title: "全英《Farm Tails》分享（参考）", url: "https://www.bilibili.com/video/BV1YN411n7JU", desc: "Ryan是坨肉松 · 3:51 · 英文音频为 AI 朗读完整故事" }
    ],
    pages: [
      {
        icon: "🐄",
        zh: "清晨的农场里，奶牛“哞——”地叫了一声，把太阳公公也叫醒了。它站在草地上，黑白花的皮毛像穿了一件小马甲，尾巴一甩一甩，赶走嗡嗡叫的苍蝇。",
        en: "In the early morning on the farm, the cow lets out a big “Moo!” and wakes up the sun. She stands in the meadow, her black-and-white coat like a little vest, swishing her tail to chase away the buzzing flies."
      },
      {
        icon: "🐴",
        zh: "“哒哒哒，哒哒哒”，是谁跑得这么快？是小马！它神气地昂着头，长长的鬃毛和尾巴在风里飘啊飘，像一面会飞的小旗子。",
        en: "Clip-clop, clip-clop! Who is running so fast? It is the little horse! He holds his head high, his mane and long tail flowing in the wind like a flying flag."
      },
      {
        icon: "🐑",
        zh: "小山坡上，一群绵羊正在吃草。它们毛茸茸的，远远看去像一朵朵会走路的白云。“咩——”小绵羊叫了一声，好像在说：“早安呀！”",
        en: "On the little hill, a flock of sheep is grazing. They are so fluffy — from far away they look like walking white clouds. “Baa!” calls the little lamb, as if saying “Good morning!”"
      },
      {
        icon: "🐷",
        zh: "泥塘边，粉红小猪正打着滚儿，玩得可开心了！它卷卷的小尾巴像一根小弹簧，走起路来一翘一翘。“哼哼，哼哼”，它唱着谁也听不懂的歌。",
        en: "By the mud puddle, the pink pig is rolling around, having a wonderful time! His curly little tail bounces like a spring as he trots along. “Oink, oink” — he sings a song only he can understand."
      },
      {
        icon: "🐓",
        zh: "“喔喔喔——”大公鸡跳到栅栏上，挺着胸脯打鸣，五彩的大尾巴像一把撑开的大扇子。它每天第一个叫醒农场，真了不起！",
        en: "“Cock-a-doodle-doo!” The rooster hops onto the fence, puffs out his chest, and crows. His colorful tail fans out like a rainbow umbrella. Every day he wakes the whole farm — what a wonderful job!"
      },
      {
        icon: "🦆",
        zh: "小鸭子们排着队，一摇一摆地走向池塘。“嘎嘎嘎”，它们一个接一个跳进水里，尾巴翘得高高的，像一艘艘小船在水面游啊游。",
        en: "The ducklings line up and waddle, waddle to the pond. “Quack, quack!” One by one they jump into the water, tails pointing up, swimming like little boats."
      },
      {
        icon: "🐶",
        zh: "农场门口，小狗蹲在地上，尾巴摇得像个小风扇。看到主人回来，它“汪汪”地叫着跑过去，绕着圈圈，开心得跳了起来。",
        en: "At the farm gate, the dog sits wagging his tail like a little fan. When his owner comes home, he barks “Woof, woof!” and runs around in circles, jumping with joy."
      },
      {
        icon: "🐱",
        zh: "太阳下山了，小猫悄悄地溜进仓库，尾巴高高地竖着，像一根小旗杆。它轻轻地“喵”了一声，找个暖和的地方蜷起来，闭上了眼睛。晚安，小猫咪，晚安，农场。",
        en: "As the sun sets, the cat slips quietly into the barn, her tail standing tall like a little flagpole. She gives a soft “Meow,” curls up in a warm spot, and closes her eyes. Good night, little cat. Good night, farm."
      }
    ]
  },
  {
    id: "dinosaur",
    cover: "images/covers/dinosaur.jpg",
    zh: "恐龙尾巴",
    en: "Dinosaur Tails",
    emoji: "🦖",
    tagline: "霸王龙 · 三角龙 · 剑龙 · 翼龙……8 种史前动物",
    audio: {
      zh: "audio/dinosaur-zh.mp3",
      en: "audio/dinosaur-en.mp3"
    },
    videos: [
      { title: "恐龙尾巴早教小故事（官方中文）", url: "https://www.bilibili.com/video/BV1VY9WB4Ear", desc: "Jollybaby 官方号 · 4:04" },
      { title: "Dinosaur Tails 布书精读（参考）", url: "https://www.bilibili.com/video/BV1Df4y1E7Wj", desc: "Smiley米Da一家 · 5:26 · 英文音频为 AI 朗读完整故事" }
    ],
    pages: [
      {
        icon: "🦖",
        zh: "很久很久以前，地球上住着巨大的恐龙。霸王龙是森林里的大王！它张开大嘴巴，露出尖尖的牙齿，粗粗的尾巴重重地一扫，小树都弯了腰。吼——",
        en: "Long, long ago, giant dinosaurs lived on the Earth. Tyrannosaurus rex was the king of the forest! He opens his huge mouth full of sharp teeth and swings his mighty tail so hard that the small trees bend. Roar!"
      },
      {
        icon: "🦕",
        zh: "“哞——”三角龙低着头，顶着三只尖尖的角，像一辆小坦克一样走过来。它背上披着厚厚的皮甲，尾巴又粗又结实，谁也不敢欺负它。",
        en: "“Moo!” The triceratops lowers his head with its three sharp horns, marching like a little tank. His back is covered in thick armor, and his tail is strong and sturdy — nobody dares to bully him."
      },
      {
        icon: "🦕",
        zh: "咦，那座小山上怎么立着一排三角形的大板子？走近一看，原来是剑龙！它的背上长着两排骨板，尾巴上还有四根尖刺，走起路来慢悠悠的，像个古代的大骑士。",
        en: "Look! What are those big triangular plates standing on that hill? It is the stegosaurus! Two rows of plates run down his back, and four sharp spikes guard his tail. He walks slowly, like a knight from long ago."
      },
      {
        icon: "🦕",
        zh: "树林边，腕龙伸着长颈鹿一样的长脖子，轻轻松松就够到了树顶。它每天要吃好多好多树叶，吃饱了就“哗啦啦”地甩甩尾巴，满足极了。",
        en: "By the forest, the brachiosaurus stretches his giraffe-like neck and easily reaches the treetops. He eats so many leaves every day! When he is full, he swishes his long tail with satisfaction."
      },
      {
        icon: "🦅",
        zh: "天空中传来一声清脆的叫声，翼龙张开大大的翅膀滑翔下来。它飞过山峰，飞过森林，风在它耳边呼呼地唱歌。",
        en: "A clear call rings in the sky — the pteranodon glides down with his big, wide wings. He flies over mountains and forests, while the wind sings in his ears."
      },
      {
        icon: "🦕",
        zh: "小溪边，甲龙慢悠悠地喝水。它全身都穿着厚厚的铠甲，连眼皮都是硬硬的。它的尾巴尖上有一个大锤子一样的骨球，轻轻一挥，就能赶走坏蛋。",
        en: "By the stream, the ankylosaurus drinks slowly. His whole body is covered in thick armor, even his eyelids! At the end of his tail is a heavy club of bone — one swing and the bad guys run away."
      },
      {
        icon: "🦕",
        zh: "河面上，一面大大的“帆”缓缓移动——那是棘龙！它背上的棘帆又高又大，它像小船一样在河里游来游去，抓鱼最拿手。",
        en: "A big “sail” moves slowly across the river — it is the spinosaurus! The sail on his back is tall and grand. He swims in the river like a boat and is the best fish-catcher of all."
      },
      {
        icon: "🦕",
        zh: "天黑了，雷龙轰隆轰隆地走回森林，长长的尾巴像鞭子一样轻轻甩动。它打了个大大的哈欠，躺下来，对满天星星说：“晚安，恐龙们，做个好梦。”",
        en: "When night falls, the apatosaurus thunders back to the forest, swishing his long whip-like tail. He gives a big yawn, lies down, and whispers to the stars: “Good night, dinosaurs. Sweet dreams.”"
      }
    ]
  },
  {
    id: "glacier",
    cover: "images/covers/glacier.jpg",
    zh: "冰川尾巴",
    en: "Glacier Tails",
    emoji: "❄️",
    tagline: "北极熊 · 企鹅 · 海豹 · 雪兔……8 种冰雪动物",
    audio: {
      zh: "audio/glacier-zh.mp3",
      en: "audio/glacier-en.mp3"
    },
    videos: [
      { title: "冰川尾巴早教小故事（官方中文）", url: "https://www.bilibili.com/video/BV1UjX5BpERn", desc: "Jollybaby 官方号 · 2:01" },
      { title: "Glacier Tails 实物翻书（英文）", url: "https://www.youtube.com/watch?v=vj1VTOUvRPn8", desc: "YouTube · 0:23 · 英文音频为 AI 朗读完整故事" }
    ],
    pages: [
      {
        icon: "🐻‍❄️",
        zh: "在世界的尽头，有一片白茫茫的冰雪世界。北极熊妈妈带着宝宝在冰面上散步。它们胖乎乎、白白的，在雪地里走啊走，就像两个会动的小雪球。",
        en: "At the edge of the world lies a great white land of ice and snow. Mama Polar Bear walks on the ice with her baby. They are plump and white, padding through the snow like two little moving snowballs."
      },
      {
        icon: "🐧",
        zh: "“啪嗒啪嗒”，一群小企鹅排着队滑过冰面，像一支小小的黑西装乐队。它们挺着小肚子，一摇一摆，扑通扑通跳进水里抓小鱼，真快活！",
        en: "Waddle, waddle! A line of little penguins slides across the ice like a tiny band in black suits. They puff out their bellies, waddle along, then plop, plop into the water to catch little fish — what fun!"
      },
      {
        icon: "🦭",
        zh: "冰洞边，圆滚滚的海豹正在晒太阳。它懒洋洋地躺着，用胖胖的爪子拍拍肚皮。听到“扑通”一声，它一骨碌滚进水里，游得比鱼还快！",
        en: "By the ice hole, the round, plump seal is sunbathing. He lies lazily, patting his belly with a chubby flipper. Splash! He rolls into the water and swims faster than a fish!"
      },
      {
        icon: "🦉",
        zh: "夜深了，北极的天空亮起神奇的极光。一只雪白的雪鸮悄悄飞过，睁着黄澄澄的大眼睛，在银色的月光下寻找小小的猎物。",
        en: "Night falls, and magical northern lights dance across the Arctic sky. A snowy owl flies by silently, his big golden eyes searching for a tiny meal in the silver moonlight."
      },
      {
        icon: "🐋",
        zh: "咔嚓——冰面裂开一道缝，大鲸鱼从冰水里冒了出来！它呼地喷出一道水柱，像一座喷泉。它说：“呼——上面的空气真新鲜！”",
        en: "Crack! A line splits the ice, and the great whale rises from the freezing water! Whoosh — he spouts a fountain of water. He sighs: “Ah — the air up here is so fresh!”"
      },
      {
        icon: "🦭",
        zh: "大浮冰上，海象先生正躺着打盹儿。它有两颗长长的白色尖牙，就像两把小勺子。醒来后，它“扑通”一声跳进水里，去海里找贝壳吃。",
        en: "On a big sheet of ice, Walrus is taking a nap. He has two long, white tusks, like two little spoons. When he wakes up, he splashes into the sea to look for shells to eat."
      },
      {
        icon: "🦌",
        zh: "雪地里，驯鹿顶着大大的鹿角“哒哒哒”地跑过。它的皮毛厚厚的，呼出的气变成一团白雾。它要去哪里？它要去山的另一边找朋友。",
        en: "Across the snow, the reindeer trots by with his big antlers held high. His coat is thick and warm, and his breath puffs out like little clouds. Where is he going? He is going to find his friends on the other side of the mountain."
      },
      {
        icon: "🐇",
        zh: "雪兔竖起长长的耳朵，东看看，西看看。它的毛和雪一样白，谁也别想发现它。它轻轻一跳，跳进雪里，只留下一个小小的脚印。晚安，冰雪世界。",
        en: "The snow hare pricks up his long ears and looks all around. His fur is as white as the snow — nobody can find him! With one soft hop, he disappears into the snow, leaving only a tiny footprint. Good night, world of ice."
      }
    ]
  }
];
