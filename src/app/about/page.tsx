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
                안녕하세요. 4년차 프런트엔드 개발자 <span className="font-semibold">안예지</span>입니다.
              </p>
            </div>
          </div>

          <section className="mb-16 space-y-6">
            <div className="prose prose-lg dark:prose-invert">
              <p>
                알고 있는 것을 공유하고, 그것이 누군가에게 도움이 되었을 때 가장 보람을 느낍니다.
              </p>
              <p>
                제품을 만들면서 경험하는 성취감에 즐거움을 느껴 개발을 시작했습니다.
              </p>
              <p>
                멋진 동료분들과 재밌는 걸 만들어 나가는 개발자로 성장해나가고 싶습니다.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted flex items-center gap-2">
                <span>💬</span>
                <span>블로그 포스팅에서 바로잡아야 할 내용이 있다면 댓글로 남겨주세요. 🙂</span>
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
