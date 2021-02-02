import { useEffect, useState } from 'react'
import type { GetServerSideProps } from 'next'

import { getProjects } from '~/api'
import Card from '~/components/Card'
import type { INode } from '~/types'
import { links } from '~/data'
import Section from '~/components/Section'
import Container from '~/components/Container'
import Footer from '~/components/Footer'
import Links from '~/components/Links'
import Grid from '~/components/Grid'

const Home = ({ projects }: { projects: INode[] }) => {
	const [colorMode, setColorMode] = useState('dark')
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const mode =
			window.localStorage.getItem('THEME') ??
			(window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light')

		setColorMode(mode)
		setMounted(true)
	}, [])

	useEffect(() => {
		localStorage.setItem('THEME', colorMode)
	}, [colorMode])

	// TODO: come up with something better to return here...
	if (!mounted) return <></>
	return (
		<>
			<Container>
				<Section name="Hi! I'm Safin 👋" alternateClassName="hi">
					<Links links={links} />
				</Section>
				<Section name="About ✨">
					<p>
						Hey! I’m Safin Singh, a self-taught high-school student, full-stack
						developer, and cybersecurity competitor.
					</p>
					<p>
						I’ve developed production-ready applications in accordance with
						industry standards using popular web frameworks such as React. In my
						free time, I enjoy making side projects with TypeScript &amp; Rust
						and playing the cello.
					</p>
					<p>
						I’m currently not looking for internships at the moment, but I will
						be in the summer of <b>2021</b>. In the meantime, feel free to shoot
						me an{' '}
						<a href="mailto:safin.singh@gmail.com" className="_email">
							email!
						</a>
					</p>
				</Section>
			</Container>
			<Container large>
				<Section name="Projects 🔨">
					<Grid>
						{projects.map((projectProps) => (
							<Card {...projectProps} key={projectProps.name} />
						))}
					</Grid>
				</Section>
			</Container>
			<Footer {...{ colorMode, setColorMode }} />
			<style global jsx>
				{`
					:root {
						${colorMode === 'light'
							? `
							--fg: #000;
							--bg: #fff;
							--bg-alpha: #ffffff80;
							--accent: #32b073;
							--muted: #666666;
							--light-gray: #d9d9d9;`
							: `
							--fg: #fff;
							--bg: #000;
							--bg-alpha: #00000080;
							--accent: #1fff92;
							--muted: #999999;
							--light-gray: #262626;`}
					}
				`}
			</style>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	return getProjects()
}

export default Home
