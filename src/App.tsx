import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Briefcase,
  MapPin,
  Calendar,
  Code2,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
function App() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 perspective-1000">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative inline-block mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-2xl opacity-20"></div>
            <motion.img
              src="https://scontent.fpnh9-1.fna.fbcdn.net/v/t39.30808-6/476819260_1658963574987786_8814684893505940238_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFV0POxfkby0vMxsqo_2I6X4knkEJEwriLiSeQQkTCuIuptGIyqkCZ38JeLmivOA-xEg4FfScOXPjk_ClbdiTtX&_nc_ohc=zdD6ePFSL2YQ7kNvgHo_dXr&_nc_oc=Adhwoa6XutUikTK0LkRdr1s37hC4JSIdF7RC2xEcZwLQFica4E8zwGnwsvKqc8oufHs&_nc_zt=23&_nc_ht=scontent.fpnh9-1.fna&_nc_gid=A6VC26uNI1EAO4ceZQNNR2z&oh=00_AYHwwyiYVh0txB_IwKnvhwkUWzSVjwGQFahsXEivOaBrmw&oe=67D87424"
              alt="Profile"
              className="relative w-64 h-64 rounded-full object-cover border-4 border-white shadow-lg"
              whileHover={{ rotate: 5 }}
            />
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600"
              whileHover={{ scale: 1.05 }}
            >
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-medium">Back-end Developer</span>
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900">Vansin Tuo</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Crafting seamless backend solutions with precision and passion.
              Transforming complex ideas into scalable, efficient digital
              experiences.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-bold text-gray-900 text-2xl mb-8 text-center">
            Educations
          </h2>

          {[
            {
              icon: Briefcase,
              title: "The National Tanning Training Institute ",
              text: "Bachelor of imformation technology, 2020 - 2024",
              color: "blue",
            },
            {
              icon: Briefcase,
              title: " SabaiCode, Phnom Penh, Cambodia (100% scholarship)",
              text: " Boot Camp full-stack Developer, 2021 - 2022",
              color: "blue",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-xl shadow-lg p-6 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-${item.color}-50 rounded-lg`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Briefcase,
              title: "Experience",
              text: "3Month  with Internship Developer At Blue Technology.",
              color: "blue",
            },
            {
              icon: Briefcase,
              title: "Experience",
              text: "2+ years with Backend Developer At Ly Brother Group (present).",
              color: "blue",
            },
            {
              icon: MapPin,
              title: "Location",
              text: "SongKat Tuol Songkea, Khan Russey Keo, Phnom Penh",
              color: "green",
            },
            // { icon: Calendar, title: 'Availability', text: 'Open to work', color: 'purple' }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-${item.color}-50 rounded-lg`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Me */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="font-bold text-gray-900 text-2xl mb-6">About Me</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              I'm a passionate software developer with a keen eye for creating
              user-centric solutions. My journey in tech started with a
              curiosity about how things work on the web, and it has evolved
              into a deep love for crafting digital experiences that make a
              difference.
            </p>
            <p>
              When I'm not immersed in code, you'll find me exploring nature
              trails, experimenting with new technologies, or contributing to
              open-source projects. I believe in the power of continuous
              learning and knowledge sharing within the developer community.
            </p>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-bold text-gray-900 text-2xl mb-8 text-center">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Laravel",
              "Next Js",
              "JavaScript",
              "Node.js",
              "PHP",
              "Jquory",
              "Vue Js",
              "HTMl",
              "CSS",
              "Tailwind CSS",
              "Bootstrap",
              "My SQL",
              "MongoDB",
              "Firbase",
              "Figma",
            ].map((skill) => (
              <motion.div
                key={skill}
                className="bg-white rounded-xl shadow-lg p-4 text-center cursor-pointer"
                whileHover={{
                  scale: 1.1,
                  rotateY: 180,
                  transition: { duration: 0.6 },
                }}
                onClick={() => setSelectedSkill(skill)}
              >
                <motion.span
                  className="font-medium inline-block"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {skill}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Version Controll */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-bold text-gray-900 text-2xl mb-8 text-center">
            Version Control
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Gitlab", "GitHub", "Bitbucket", "Trello"].map((skill) => (
              <motion.div
                key={skill}
                className="bg-white rounded-xl shadow-lg p-4 text-center cursor-pointer"
                whileHover={{
                  scale: 1.1,
                  rotateY: 180,
                  transition: { duration: 0.6 },
                }}
                onClick={() => setSelectedSkill(skill)}
              >
                <motion.span
                  className="font-medium inline-block"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {skill}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="font-bold text-gray-900 text-2xl mb-8">
            Let's Connect
          </h2>
          <div className="flex justify-center gap-6">
            {[
              {
                icon: Github,
                href: "https://github.com/vansintuo",
                color: "text-gray-700",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/tuo-vansin-481877232/",
                color: "text-blue-600",
              },
              {
                icon: Mail,
                href: "mailto:tuovansin123@gmail.com",
                color: "text-red-500",
              },
            ].map(({ icon: Icon, href, color }) => (
              <motion.a
                key={color}
                href={href}
                className="bg-white rounded-xl shadow-lg p-4"
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  transition: { duration: 0.6 },
                }}
              >
                <Icon className={`w-6 h-6 ${color}`} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Skill Details Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                initial={{ scale: 0.5, rotateX: 90 }}
                animate={{ scale: 1, rotateX: 0 }}
                exit={{ scale: 0.5, rotateX: -90 }}
                className="bg-white p-8 rounded-2xl shadow-2xl max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-4">{selectedSkill}</h3>
                <p className="text-gray-600">
                  Detailed information about {selectedSkill} and my experience
                  with it.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
