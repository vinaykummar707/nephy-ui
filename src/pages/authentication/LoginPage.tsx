import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useUserStore, { User } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { UserRoles } from '@/enums.ts';
import LabelError from '@/components/LabelError';
import { toast } from 'sonner';

type Inputs = {
	email: string;
	password: string;
};

const LoginPage = ({ role = UserRoles.HOSPITAL_ADMIN }: any) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const setUser = useUserStore((state) => state.setUser);

	const navigate = useNavigate();

	const createAccount = async (data: any) => {
		const res = await axios.post(
			'http://localhost:3000/users/login',
			JSON.stringify(data),
			{
				headers: { 'Content-Type': 'application/json' },
			}
		);
		return res.data;
	};

	const { mutate, isPending } = useMutation({
		mutationFn: createAccount,
		onSuccess: (data: AxiosResponse) => {
			console.log('====================================');
			console.log(data);
			console.log('====================================');
			setUser(data?.user);
			localStorage.setItem('user', JSON.stringify(data.user));
			switch (data.user.role) {
				case UserRoles.HOSPITAL_ADMIN:
				case UserRoles.DIALYSIS_UNIT_ADMIN:
					navigate('/onboarding');
					break;

				default:
					break;
			}
			toast(data.message);
		},
		onError: (error: AxiosError) => {
			toast(error.response?.data.error as string);
			console.error('Error creating item:', error);
		},
	});

	useEffect(() => {
		console.log(isPending);
	}, [isPending]);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		data.role = role;
		mutate(data);
	};

	return (
		<div className="flex-1  flex flex-col items-center justify-center">
			/
			<div className="w-[65%] flex flex-col  gap-8">
				<div className="space-y-1">
					<h1 className="text-3xl w-[300px] tracking-tight font-extrabold">
						Hey! Thanks For Coming Back
					</h1>
				</div>
				<div className="grid gap-1   grid-cols-2">
					<div className="space-y-1 col-span-2">
						<Label className="text-muted-foreground text-sm">
							Email Address
						</Label>
						<Input
							{...register('email', { required: true })}
							placeholder="Ex: Johndoe@email.com"
						></Input>
						{errors.email?.type === 'required' && <LabelError />}
					</div>
					<div className="space-y-1 col-span-2">
						<Label className="text-muted-foreground text-sm">Password</Label>
						<Input
							{...register('password', { required: true })}
							placeholder="*********"
							type="password"
						></Input>
						{errors.password?.type === 'required' && <LabelError />}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<Button onClick={handleSubmit(onSubmit)}>Sign In</Button>
					<Button
						onClick={() => navigate('/auth/register-hospital')}
						variant={'secondary'}
					>
						Set Up Your Own Clinic
					</Button>
					<h1 className="text-sm self-center text-muted-foreground">Or</h1>
					<Button variant={'outline'}>Create A New Account</Button>
					<h1 className="text-xs text-center self-center text-muted-foreground">
						By clicking continue, you agree to our Terms of Service and Privacy
						Policy.
					</h1>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
