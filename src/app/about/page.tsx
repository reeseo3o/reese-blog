'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="pt-8 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10 flex items-center gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2">About.</h1>
              <p className="text-xl text-muted">
                안녕하세요. 프런트엔드 개발자 <span className="font-semibold">Reese</span>입니다.
              </p>
            </div>
          </div>

          <section className="mb-16 space-y-6">
            <div className="prose prose-lg dark:prose-invert">
              <p>
                기능이 잘 작동하더라도 흐름이 끊기거나 다음 행동의 맥락이 보이지 않으면 사용자는
                쉽게 멈춥니다. 저는 이러한 흐름의 끊김을 단순한 UI 문제가 아닌{' '}
                <strong>제품 경험이 단절되는 지점</strong>으로 보고 조기에 식별하려 노력해 왔습니다.
              </p>
              <p>
                프런트엔드는 단순한 화면 구현을 넘어서, 기획자·디자이너·백엔드 동료들의 의도를
                사용자 행동으로 연결하는 인터페이스라고 생각합니다. 그래서 기능 단위보다는 사용자
                흐름을 기준으로 문제를 정의하고, 망설임이나 이탈이 발생하는 구간을 중심으로
                인터랙션을 설계합니다.
              </p>
              <p>
                좋은 코드를 작성하는 것도 중요하지만, 팀이 설계한 가치가 사용자에게 얼마나 빠르고
                정확하게 전달되는지가 제품의 완성도를 결정한다고 생각합니다. 기능 구현에 그치지
                않고, <strong>사용자 흐름이 자연스럽게 이어지도록</strong>&nbsp; 만드는 데 집중하고
                있습니다.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
