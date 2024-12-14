import { Clipboard, MonitorIcon as MonitorShare, MonitorUp } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';

export default function JoinContainer() {
	const [generatedCode, setGeneratedCode] = useState<string | null>(null);

	const handleCodeGeneration = () => {
		if (generatedCode) {
			setGeneratedCode(null);
		} else {
			const newCode = Math.floor(100000 + Math.random() * 900000).toString();
			setGeneratedCode(newCode);
		}
	};

	const formatCode = (code: string) => {
		return `${code.slice(0, 3)} ${code.slice(3)}`;
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div className="max-w-4xl w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* 화면 공유 */}
					<Card className="bg-white border-gray-200 flex flex-col p-4 shadow-md">
						<CardHeader className="space-y-4">
							<div className="flex items-center gap-3">
								<div className="rounded-lg bg-blue-100 p-3">
									<MonitorShare className="h-7 w-7 text-blue-600" />
								</div>
								<CardTitle className="text-gray-800 text-2xl">화면 공유</CardTitle>
							</div>
							<p className="text-base text-gray-600">
								다른 사용자가 원격으로 내 컴퓨터를 제어할 수 있도록 코드를 생성합니다
							</p>
						</CardHeader>
						{generatedCode && (
							<CardContent className="pt-2">
								<div className="relative flex items-center justify-center">
									<div className="text-3xl font-bold text-black">{formatCode(generatedCode)}</div>
									<div className="absolute right-0">
										<Button variant="outline" size="icon" className="h-10 w-10">
											<Clipboard className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</CardContent>
						)}
						<CardFooter className="pt-2 mt-auto">
							<Button
								className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-4"
								onClick={handleCodeGeneration}
							>
								{generatedCode ? '취소' : '+ 코드 생성'}
							</Button>
						</CardFooter>
					</Card>
					{/* 다른 컴퓨터에 연결 */}
					<Card className="bg-white border-gray-200 flex flex-col p-4 shadow-md">
						<CardHeader className="space-y-4">
							<div className="flex items-center gap-3">
								<div className="rounded-lg bg-red-100 p-3">
									<MonitorUp className="h-7 w-7 text-red-600" />
								</div>
								<CardTitle className="text-gray-800 text-2xl">다른 컴퓨터에 연결</CardTitle>
							</div>
							<p className="text-base text-gray-600">원격 액세스 코드를 입력하여 다른 컴퓨터에 연결합니다</p>
						</CardHeader>
						<CardContent className="pt-2">
							<Input
								placeholder="액세스 코드를 입력하세요"
								className="bg-white text-gray-800 border-gray-300 placeholder-gray-400 text-lg py-4"
							/>
						</CardContent>
						<CardFooter className="pt-2">
							<Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-4">
								연결
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
