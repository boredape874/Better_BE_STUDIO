import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const KAKAO_URL = 'https://open.kakao.com/YOUR_LINK'
const EMAIL = 'your@email.com'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <motion.div
        className="max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-[#111111] mb-2">문의하기</h2>
        <p className="text-sm text-[#111111]/50 mb-12 tracking-wide uppercase">Contact</p>
        <p className="text-[#111111]/70 mb-10 leading-relaxed">
          웹사이트, 쇼핑몰, 대시보드 등 어떤 프로젝트든 편하게 연락 주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-[#FEE500] text-[#111111] hover:bg-[#FEE500]/80 rounded-none font-medium px-8"
          >
            <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer">
              카카오톡 문의
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white rounded-none font-medium px-8 transition-colors duration-300"
          >
            <a href={`mailto:${EMAIL}`}>이메일 문의</a>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
