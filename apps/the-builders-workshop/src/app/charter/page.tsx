import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Target, TrendingUp, Users, Award, ArrowRight } from "lucide-react";

export default function CharterPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-neutral-900">
            From Training to Fluency
          </h1>
          <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
            The Builders Workshop transforms designers into code-fluent contributors through capability transformation, not time savings.
          </p>
        </div>

        {/* Mission */}
        <section className="bg-white rounded-lg p-8 border border-neutral-200 shadow-sm">
          <div className="flex items-start gap-4">
            <Target className="h-8 w-8 text-brand flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-neutral-900">Our Mission</h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                By EOY 2026, we aim to achieve a measurable percentage of designers committing code to production. This is not about making designers work faster—it&apos;s about expanding what they can do.
              </p>
              <p className="text-base text-neutral-700 leading-relaxed">
                <strong>The Gap:</strong> Individual efficiency gains from AI tools are not translating to organizational shipping speed. Designers remain dependent on engineers for implementation.
              </p>
              <p className="text-base text-neutral-700 leading-relaxed">
                <strong>The Solution:</strong> Cursor enables designers to build without deep technical knowledge. The Builders Workshop provides the framework, community, and recognition to make this transformation real.
              </p>
            </div>
          </div>
        </section>

        {/* The Shopify Model */}
        <section className="bg-white rounded-lg p-8 border border-neutral-200 shadow-sm">
          <div className="flex items-start gap-4">
            <Users className="h-8 w-8 text-brand flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-neutral-900">The Shopify Model</h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                Our North Star is Shopify, where designers routinely commit code to production. This is not a distant aspiration—it is a proven model of capability transformation at scale.
              </p>
              <div className="bg-blue-50 border-l-4 border-brand p-4 mt-4">
                <p className="text-sm font-medium text-neutral-900 mb-2">Why Shopify Works:</p>
                <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                  <li>Designers own end-to-end implementation, not just handoff</li>
                  <li>Code contributions are expected, measured, and celebrated</li>
                  <li>Culture values fluency over specialization boundaries</li>
                  <li>Org shipping speed increases when designers can ship</li>
                </ul>
              </div>
              <p className="text-base text-neutral-700 leading-relaxed">
                We are not trying to turn designers into engineers. We are enabling designers to contribute code within their domain of expertise—interfaces, interactions, and user experience.
              </p>
            </div>
          </div>
        </section>

        {/* 5-Stage Framework */}
        <section className="bg-white rounded-lg p-8 border border-neutral-200 shadow-sm">
          <div className="flex items-start gap-4">
            <TrendingUp className="h-8 w-8 text-brand flex-shrink-0 mt-1" />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-neutral-900">The 5-Stage Framework</h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                Capability transformation happens in stages. Each stage builds on the previous, moving from awareness to production integration.
              </p>

              <div className="space-y-4 mt-6">
                <div className="border-l-4 border-neutral-300 pl-4">
                  <h3 className="font-semibold text-neutral-900">Stage 1: Awareness</h3>
                  <p className="text-sm text-neutral-700">
                    Understanding that AI tools like Cursor enable designers to write code without deep technical knowledge.
                  </p>
                </div>

                <div className="border-l-4 border-neutral-400 pl-4">
                  <h3 className="font-semibold text-neutral-900">Stage 2: Foundations</h3>
                  <p className="text-sm text-neutral-700">
                    Installing tools, forking the starter template, building local prototypes.
                  </p>
                </div>

                <div className="border-l-4 border-neutral-500 pl-4">
                  <h3 className="font-semibold text-neutral-900">Stage 3: Utility</h3>
                  <p className="text-sm text-neutral-700">
                    Using code for real design work—rapid iteration, user testing, internal demos.
                  </p>
                </div>

                <div className="border-l-4 border-neutral-700 pl-4">
                  <h3 className="font-semibold text-neutral-900">Stage 4: GitHub</h3>
                  <p className="text-sm text-neutral-700">
                    Connecting to repositories, creating branches, submitting pull requests.
                  </p>
                </div>

                <div className="border-l-4 border-brand pl-4">
                  <h3 className="font-semibold text-neutral-900">Stage 5: Integration</h3>
                  <p className="text-sm text-neutral-700">
                    Code merged to production. Designers contributing to the codebase like any other team member.
                  </p>
                </div>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 p-4 mt-6">
                <p className="text-sm text-neutral-700">
                  <strong>Key Insight:</strong> Most designers get stuck at Stage 2-3. The Builders Workshop provides the structure, community, and recognition to reach Stage 5.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="bg-white rounded-lg p-8 border border-neutral-200 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900">Why This Matters</h2>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900 text-lg">Before</h3>
                <ul className="text-sm text-neutral-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Designers create mockups, wait for engineers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Ideas take weeks to become testable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Designers cannot iterate without engineering time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Implementation details lost in handoff</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900 text-lg">After</h3>
                <ul className="text-sm text-neutral-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Designers ship working prototypes same day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Ideas testable with users within hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Designers own end-to-end implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Design intent preserved through to production</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Certification */}
        <section className="bg-white rounded-lg p-8 border border-neutral-200 shadow-sm">
          <div className="flex items-start gap-4">
            <Award className="h-8 w-8 text-brand flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-neutral-900">Builder Certification</h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                Certification is proof, not vanity metrics. To earn Builder status, you must demonstrate capability transformation through real work.
              </p>

              <div className="bg-neutral-50 border border-neutral-200 p-6 mt-4 space-y-3">
                <p className="text-sm font-medium text-neutral-900">Requirements (all 6 must be met):</p>
                <ul className="text-sm text-neutral-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-brand">1.</span>
                    <span>Build a prototype from the official starter template</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-brand">2.</span>
                    <span>Use it for real design work (user testing, stakeholder demos, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-brand">3.</span>
                    <span>Connect to a GitHub repository</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-brand">4.</span>
                    <span>Create at least 3 meaningful commits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-brand">5.</span>
                    <span>Submit at least 1 pull request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-brand">6.</span>
                    <span>Share your prototype with the community</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-neutral-600 italic">
                These requirements ensure that certification represents real fluency, not just tool installation or tutorial completion.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-brand to-blue-700 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Start Building?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Fork the official starter template and begin your journey from awareness to integration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/getting-started">
              <Button
                size="lg"
                className="bg-white text-brand hover:bg-neutral-100 font-semibold"
              >
                Getting Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/prototype-playground">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                View Starter Template
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-sm text-neutral-500 pt-8">
          <p>
            Questions about the Builders Workshop?{" "}
            <Link href="/fluency-status" className="text-brand hover:underline">
              Check your fluency status
            </Link>
            {" "}or reach out to the pilot cohort community.
          </p>
        </div>
      </div>
    </div>
  );
}
