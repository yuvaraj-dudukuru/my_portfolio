import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openCourses, paths } from '../../data/courses.js';
import CourseCard from '../cards/CourseCard.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';

// The Learn band is the one place the page changes surface. It marks the switch
// from "assess this engineer" to "learn from this engineer" without turning the
// site into two disconnected halves.
export default function LearnPreview() {
  return (
    <section
      className="section border-y-2 border-hard bg-bg-subtle"
      aria-labelledby="learn-preview"
    >
      <div className="shell">
        <SectionHeader
          id="learn-preview"
          index="04"
          label="Learn"
          title="Courses that end in something that runs"
          description="Live, online, project-based programmes. Every one finishes with a piece of work you built and can explain — not a quiz score."
          action={{ label: 'All courses and paths', to: '/learn' }}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {openCourses.map((course, i) => (
            <Reveal key={course.slug} delay={i * 60} className="h-full">
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4 rounded border-2 border-hard bg-bg p-6 sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="label">Learning paths</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
                Courses sequenced into a route to a role, with the stages that are not built yet
                marked as such.
              </p>
            </div>
            <ul className="flex flex-wrap items-center gap-2">
              {paths.map((path) => (
                <li key={path.slug}>
                  <Link
                    to={`/learn#${path.slug}`}
                    className="group inline-flex items-center gap-2 rounded border-2 border-hard px-3.5 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent-text"
                  >
                    {path.title}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
